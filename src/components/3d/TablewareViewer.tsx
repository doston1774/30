import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { buildCrystalGoblet, buildPorcelainTeapot, buildRoyalPlatter } from './tablewareModels';
import { Sparkles, RotateCw, Eye, Maximize2, Minimize2, ChevronDown, ChevronUp, Layers } from 'lucide-react';

interface TablewareViewerProps {
  modelKey: 'crystal_goblet' | 'porcelain_teapot' | 'royal_platter';
  productTitle: string;
  onClose?: () => void;
  fullScreen?: boolean;
}

export function TablewareViewer({
  modelKey,
  productTitle,
  onClose,
  fullScreen = false,
}: TablewareViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [finish, setFinish] = useState<'gold' | 'platinum' | 'cobalt'>('gold');
  const [lightingPreset, setLightingPreset] = useState<'studio' | 'candle' | 'daylight'>('studio');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);

  // Store mutable state in ref to avoid re-triggering Three.js setup
  const sceneStateRef = useRef({
    modelKey,
    finish,
    lightingPreset,
    autoRotate,
  });

  useEffect(() => {
    sceneStateRef.current = { modelKey, finish, lightingPreset, autoRotate };
  }, [modelKey, finish, lightingPreset, autoRotate]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Detect software WebGL
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return true;
      }
    })();

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 550;

    // 1. Scene & Renderer Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(lightingPreset === 'candle' ? 0x120c08 : 0x0f1115);
    scene.fog = new THREE.FogExp2(lightingPreset === 'candle' ? 0x120c08 : 0x0f1115, 0.035);

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 50);
    camera.position.set(0, 4.2, 9.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // 2. Studio Environment Reflection via RoomEnvironment
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // 3. Studio Lighting Rig (Warm Key Light, Cool Fill, Rim)
    const keyLight = new THREE.DirectionalLight(0xfff4e0, 2.8);
    keyLight.position.set(5, 8, 5);
    keyLight.castShadow = !isSoftwareGl;
    if (!isSoftwareGl) {
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      keyLight.shadow.camera.near = 0.5;
      keyLight.shadow.camera.far = 25;
      keyLight.shadow.camera.left = -6;
      keyLight.shadow.camera.right = 6;
      keyLight.shadow.camera.top = 6;
      keyLight.shadow.camera.bottom = -6;
      keyLight.shadow.bias = -0.0005;
    }
    scene.add(keyLight);

    const hemiLight = new THREE.HemisphereLight(0xe8f0fe, 0x1f1914, 0.9);
    hemiLight.position.set(0, 15, 0);
    scene.add(hemiLight);

    const rimLight = new THREE.DirectionalLight(0xd4af37, 1.8);
    rimLight.position.set(-6, 4, -6);
    scene.add(rimLight);

    // 4. OrbitControls with smooth exponential damping
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = !isSoftwareGl;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 - 0.05; // Prevent camera sinking under floor
    controls.minDistance = 3.5;
    controls.maxDistance = 18;
    controls.target.set(0, 2.2, 0);
    controls.update();

    // 5. Active Model Node in Scene
    let activeModelGroup: THREE.Group | null = null;

    function buildCurrentModel(curModelKey: string, curFinish: 'gold' | 'platinum' | 'cobalt') {
      if (activeModelGroup) {
        scene.remove(activeModelGroup);
      }

      const opts = { isSoftwareGl, finishPreset: curFinish };
      if (curModelKey === 'crystal_goblet') {
        activeModelGroup = buildCrystalGoblet(opts);
      } else if (curModelKey === 'porcelain_teapot') {
        activeModelGroup = buildPorcelainTeapot(opts);
      } else {
        activeModelGroup = buildRoyalPlatter(opts);
      }

      scene.add(activeModelGroup);
    }

    buildCurrentModel(modelKey, finish);

    // 6. Animation Loop paced for Software WebGL
    let frameId: number = 0;
    let isDisposed = false;

    function afterDraw(cb: () => void) {
      if (isDisposed) return;
      try {
        const gl = renderer.getContext() as WebGL2RenderingContext;
        const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
        gl.flush();
        const poll = () => {
          if (isDisposed) return;
          const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
          if (state === gl.UNSIGNALED) {
            frameId = window.setTimeout(poll, 10);
          } else {
            if (sync) gl.deleteSync(sync);
            frameId = window.setTimeout(cb, 100);
          }
        };
        frameId = window.setTimeout(poll, 10);
      } catch {
        frameId = window.setTimeout(cb, 100);
      }
    }

    function tick() {
      if (isDisposed) return;
      controls.update();

      if (activeModelGroup && sceneStateRef.current.autoRotate) {
        activeModelGroup.rotation.y += 0.015;
      }

      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    }

    tick();

    // Resize handler
    const handleResize = () => {
      if (!container || isDisposed) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      isDisposed = true;
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
      controls.dispose();
    };
  }, [modelKey, finish, lightingPreset]);

  return (
    <div className={`relative w-full overflow-hidden bg-[#0d0f12] text-amber-50 select-none ${fullScreen ? 'h-[85vh] rounded-2xl border border-amber-900/40' : 'h-[500px] rounded-xl border border-amber-800/30'}`}>
      {/* 3D Canvas mount container */}
      <div ref={containerRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top minimal spec badge */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-3 bg-[#161a22]/90 border border-amber-700/40 px-4 py-2 rounded-xl backdrop-blur-md shadow-2xl">
        <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
        <div>
          <h4 className="text-xs font-semibold tracking-wider uppercase text-amber-300 font-cinzel">
            3D Interaktiv Koʻrish (Three.js Studio PBR)
          </h4>
          <p className="text-xs text-stone-300 line-clamp-1">{productTitle}</p>
        </div>
      </div>

      {/* Top right actions */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium border flex items-center gap-1.5 transition ${
            autoRotate
              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
              : 'bg-stone-900/80 text-stone-400 border-stone-700 hover:text-white'
          }`}
          title="Avtomatik aylanishni yoqish / oʻchirish"
          aria-label="Aylanish"
        >
          <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
          <span>Aylanish</span>
        </button>
        {onClose && (
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-stone-900/80 text-stone-300 border border-stone-700 hover:bg-stone-800"
            aria-label="Yopish"
          >
            Yopish
          </button>
        )}
      </div>

      {/* Collapsible Sleek Bottom Control Dock (Follows 3D skill: <= 15% viewport footprint, bottom center) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 w-[94%] max-w-2xl transition-all duration-300">
        {/* Toggle Cinema / Zen Mode button */}
        <div className="flex justify-center -mb-2">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="bg-[#181c24] hover:bg-[#202632] border border-amber-700/50 text-amber-300 text-xs px-3 py-1 rounded-t-lg shadow-lg flex items-center gap-1 font-sans"
            aria-label={isCollapsed ? 'Boshqaruvni koʻrsatish' : 'Boshqaruvni yashirish'}
          >
            {isCollapsed ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            <span>{isCollapsed ? 'Boshqaruvni ochish' : 'Zen Rejimi (Yashirish)'}</span>
          </button>
        </div>

        {!isCollapsed && (
          <div className="bg-[#14171f]/95 border border-amber-700/40 rounded-2xl p-3.5 shadow-2xl flex flex-wrap items-center justify-between gap-3 text-xs">
            {/* Finish swatches */}
            <div className="flex items-center gap-2">
              <span className="text-stone-400 font-medium">Qoplama:</span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setFinish('gold')}
                  className={`px-2.5 py-1 rounded-md transition flex items-center gap-1.5 border ${
                    finish === 'gold'
                      ? 'bg-amber-500/25 text-amber-200 border-amber-400 font-semibold'
                      : 'bg-stone-900/60 text-stone-400 border-stone-800 hover:text-white'
                  }`}
                  aria-label="24K Oltin"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-amber-600 to-yellow-300" />
                  24K Zarhal
                </button>
                <button
                  onClick={() => setFinish('platinum')}
                  className={`px-2.5 py-1 rounded-md transition flex items-center gap-1.5 border ${
                    finish === 'platinum'
                      ? 'bg-slate-500/25 text-slate-100 border-slate-300 font-semibold'
                      : 'bg-stone-900/60 text-stone-400 border-stone-800 hover:text-white'
                  }`}
                  aria-label="Platina"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-slate-400 to-slate-100" />
                  Platina
                </button>
                <button
                  onClick={() => setFinish('cobalt')}
                  className={`px-2.5 py-1 rounded-md transition flex items-center gap-1.5 border ${
                    finish === 'cobalt'
                      ? 'bg-blue-600/30 text-blue-200 border-blue-400 font-semibold'
                      : 'bg-stone-900/60 text-stone-400 border-stone-800 hover:text-white'
                  }`}
                  aria-label="Qirollik Kobalti"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-blue-900 to-indigo-500" />
                  Kobalt
                </button>
              </div>
            </div>

            {/* Lighting atmosphere */}
            <div className="flex items-center gap-2">
              <span className="text-stone-400 font-medium">Nur:</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setLightingPreset('studio')}
                  className={`px-2 py-1 rounded-md transition border ${
                    lightingPreset === 'studio'
                      ? 'bg-amber-500/25 text-amber-200 border-amber-400 font-medium'
                      : 'bg-stone-900/60 text-stone-400 border-stone-800'
                  }`}
                >
                  Studiya
                </button>
                <button
                  onClick={() => setLightingPreset('candle')}
                  className={`px-2 py-1 rounded-md transition border ${
                    lightingPreset === 'candle'
                      ? 'bg-amber-500/25 text-amber-200 border-amber-400 font-medium'
                      : 'bg-stone-900/60 text-stone-400 border-stone-800'
                  }`}
                >
                  Sham Nuri
                </button>
              </div>
            </div>

            {/* Hint */}
            <div className="text-[11px] text-stone-400 flex items-center gap-1">
              <Eye className="w-3 h-3 text-amber-400" />
              <span>Sichqoncha bilan 360° aylantiring va yaqinlashtiring</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
