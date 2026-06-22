import './styles.css';

const steps = [
  {
    eyebrow: 'Step 01',
    title: 'Prepare the application folder',
    body: 'Docker starts from a build context: the project folder sent to the Docker daemon. This usually includes source code, dependency manifests, config templates, and a Dockerfile.',
    command: 'server.js + package.json + Dockerfile + .dockerignore',
    focus: 'app',
    duration: 3500,
  },
  {
    eyebrow: 'Step 02',
    title: 'Filter files with .dockerignore',
    body: 'Before building, Docker removes ignored files from the build context so secrets, logs, local dependencies, and bulky folders do not get copied into the image.',
    command: '.dockerignore -> node_modules, .git, .env.local, logs',
    focus: 'app',
    duration: 3500,
  },
  {
    eyebrow: 'Step 03',
    title: 'Read the Dockerfile recipe',
    body: 'The Dockerfile is a sequence of instructions. Docker reads it from top to bottom and turns each meaningful instruction into an image layer.',
    command: 'FROM -> WORKDIR -> COPY -> RUN -> EXPOSE -> CMD',
    focus: 'dockerfile',
    duration: 4000,
  },
  {
    eyebrow: 'Step 04',
    title: 'Build cached image layers',
    body: 'Docker executes each instruction and stores the result as a layer. If an instruction and its inputs have not changed, Docker can reuse the cached layer.',
    command: 'docker build -t checkout-api:1.0 .',
    focus: 'image',
    duration: 4000,
  },
  {
    eyebrow: 'Step 05',
    title: 'Tag and store the image',
    body: 'The built image receives a name and tag. It can stay local or be pushed to a registry so other machines can pull the exact same artifact.',
    command: 'docker tag checkout-api:1.0 registry/app:1.0',
    focus: 'image',
    duration: 3500,
  },
  {
    eyebrow: 'Step 06',
    title: 'Create the container runtime sandbox',
    body: 'When the image runs, Docker creates a writable container layer plus isolated namespaces for process, filesystem, networking, and environment variables.',
    command: 'docker run --name checkout -e NODE_ENV=prod checkout-api:1.0',
    focus: 'container',
    duration: 4500,
  },
  {
    eyebrow: 'Step 07',
    title: 'Connect ports, env, and volumes',
    body: 'A useful container needs controlled inputs and outputs: port mapping for traffic, environment variables for configuration, and volumes for persistent data.',
    command: 'docker run -p 8080:80 -v app-data:/data --env-file .env',
    focus: 'container',
    duration: 4500,
  },
  {
    eyebrow: 'Step 08',
    title: 'Scale identical containers',
    body: 'Because every container starts from the same image, you can run multiple copies behind a load balancer or orchestrator without rebuilding the app.',
    command: 'one image -> many containers -> predictable deployments',
    focus: 'scale',
    duration: 4000,
  },
];

const deepDiveSteps = [
  {
    number: '01',
    title: 'Build context is collected',
    label: 'Input folder',
    summary: 'Docker receives a snapshot of your project directory. This is the raw material for the image build.',
    command: 'docker build .',
    points: ['Source code is included', 'Dependency manifests are included', 'Dockerfile gives build instructions'],
    visual: 'context',
  },
  {
    number: '02',
    title: '.dockerignore removes noise',
    label: 'Context filter',
    summary: 'Files that should not be sent to Docker are filtered out before the build starts.',
    command: 'node_modules\n.git\n.env.local',
    points: ['Smaller builds', 'Fewer accidental secrets', 'Cleaner image contents'],
    visual: 'ignore',
  },
  {
    number: '03',
    title: 'Base image is pulled',
    label: 'FROM',
    summary: 'Docker starts from an existing image such as Node, Python, Nginx, Ubuntu, or Alpine.',
    command: 'FROM node:22-alpine',
    points: ['Provides operating-system files', 'Provides language runtime', 'Becomes the first image layer'],
    visual: 'base',
  },
  {
    number: '04',
    title: 'App files are copied in',
    label: 'COPY',
    summary: 'Docker copies selected files from the build context into the image filesystem.',
    command: 'WORKDIR /app\nCOPY package*.json ./\nCOPY src ./src',
    points: ['Creates repeatable file layout', 'Separates dependency files from app files', 'Improves layer caching'],
    visual: 'copy',
  },
  {
    number: '05',
    title: 'Dependencies are installed',
    label: 'RUN',
    summary: 'Build commands run inside the temporary build environment and their output becomes another image layer.',
    command: 'RUN npm ci --omit=dev',
    points: ['Installs exact dependency versions', 'Stores output in the image', 'Reuses cache if package files do not change'],
    visual: 'run',
  },
  {
    number: '06',
    title: 'Startup command is recorded',
    label: 'CMD',
    summary: 'The image stores metadata describing the default command, exposed port, working directory, and environment defaults.',
    command: 'EXPOSE 80\nCMD ["node", "server.js"]',
    points: ['Image is still not running', 'Metadata tells containers how to start', 'Command can be overridden at run time'],
    visual: 'cmd',
  },
  {
    number: '07',
    title: 'Image becomes immutable blueprint',
    label: 'Image artifact',
    summary: 'The final image is a stack of read-only layers plus metadata. It can be tagged, shared, scanned, and pulled elsewhere.',
    command: 'checkout-api:1.0 -> sha256:9f2...',
    points: ['Read-only layers', 'Content-addressed ID', 'Same artifact runs everywhere'],
    visual: 'artifact',
  },
  {
    number: '08',
    title: 'Container gets writable layer',
    label: 'Runtime layer',
    summary: 'Running an image adds a thin writable layer on top. Changes inside the container go there, not into the original image.',
    command: 'docker run checkout-api:1.0',
    points: ['Image stays unchanged', 'Container can write temporary files', 'Removing container removes that writable layer'],
    visual: 'writable',
  },
  {
    number: '09',
    title: 'Isolation is created',
    label: 'Namespaces',
    summary: 'Docker uses kernel features to isolate process IDs, filesystem mounts, network interfaces, users, and resource limits.',
    command: 'PID namespace + mount namespace + network namespace',
    points: ['Own process view', 'Own filesystem view', 'Own network identity'],
    visual: 'isolation',
  },
  {
    number: '10',
    title: 'Traffic enters through port mapping',
    label: 'Networking',
    summary: 'The app listens inside the container. Port mapping connects a host port to the container port.',
    command: '-p 8080:80  means  host:8080 -> container:80',
    points: ['Host receives browser request', 'Docker forwards to container', 'App response comes back out'],
    visual: 'ports',
  },
  {
    number: '11',
    title: 'Config and data are attached',
    label: 'Env + volumes',
    summary: 'Environment variables configure behavior. Volumes keep important data outside the disposable container layer.',
    command: '--env-file .env -v app-data:/data',
    points: ['Config changes without rebuild', 'Data survives container replacement', 'Secrets should be injected safely'],
    visual: 'volumes',
  },
  {
    number: '12',
    title: 'Same image scales into many containers',
    label: 'Replication',
    summary: 'Scaling creates more containers from the same image, often behind a load balancer or orchestrator.',
    command: 'docker compose up --scale api=3',
    points: ['Identical runtime package', 'Independent container instances', 'Easy rollback by using an older image tag'],
    visual: 'replicas',
  },
];

const appFiles = ['server.js', 'package.json', '.env', 'routes/', 'views/'];
const imageLayers = ['node:22-alpine', 'npm packages', 'app source', 'env defaults', 'CMD node server'];

const visualMarkup = {
  context: '<div class="mini-files"><i>src/</i><i>package.json</i><i>Dockerfile</i><i>README.md</i></div>',
  ignore: '<div class="mini-filter"><i>src/</i><i class="blocked">node_modules</i><i>Dockerfile</i><i class="blocked">.git</i></div>',
  base: '<div class="mini-stack"><i>alpine fs</i><i>node runtime</i><i>security patches</i></div>',
  copy: '<div class="mini-copy"><i>host files</i><b></b><i>/app</i></div>',
  run: '<div class="mini-terminal"><i>$ npm ci</i><i>fetch packages</i><i>write node_modules</i></div>',
  cmd: '<div class="mini-metadata"><i>EXPOSE 80</i><i>WORKDIR /app</i><i>CMD node server.js</i></div>',
  artifact: '<div class="mini-image"><i>layer 5</i><i>layer 4</i><i>layer 3</i><i>layer 2</i><i>layer 1</i><b>sha256</b></div>',
  writable: '<div class="mini-writable"><i>read-only image</i><strong>writable container layer</strong></div>',
  isolation: '<div class="mini-isolation"><i>PID</i><i>FS</i><i>NET</i><i>CPU</i></div>',
  ports: '<div class="mini-ports"><i>host :8080</i><b></b><i>container :80</i></div>',
  volumes: '<div class="mini-volumes"><i>.env</i><i>volume</i><b>container</b></div>',
  replicas: '<div class="mini-replicas"><i>api-1</i><i>api-2</i><i>api-3</i><b>load balancer</b></div>',
};

const app = document.querySelector('#app');

app.innerHTML = `
  <main class="page-shell">
    <header class="app-header reveal">
      <div class="header-brand">
        <p class="kicker">Interactive Workspace</p>
        <h1 class="logo-title">Docker Visual Explainer</h1>
      </div>
      <div class="mode-switcher" role="tablist" aria-label="Application Mode">
        <button id="btnModeWalkthrough" class="mode-tab-btn active" role="tab" aria-selected="true" type="button">
          Guided Walkthrough
        </button>
        <button id="btnModeLab" class="mode-tab-btn" role="tab" aria-selected="false" type="button">
          Interactive Playgrounds
        </button>
      </div>
    </header>

    <section class="hero" aria-labelledby="hero-display-title">
      <!-- Left Column: Variable Content Panels -->
      <div class="hero__copy reveal">
        <!-- 1. Walkthrough Description Panel -->
        <div id="panelWalkthrough" class="content-panel">
          <h2 id="hero-display-title">Watch an app become a container.</h2>
          <p class="hero__lede">
            Step through the compilation process. See how source components stack into cached layers,
            how the environment gets isolated, and how network routing maps requests.
          </p>
        </div>

        <!-- 2. Interactive Labs Configuration Panels -->
        <div id="panelLab" class="content-panel" style="display: none;">
          <h2>Interactive Concept Labs</h2>
          <p class="hero__lede">
            Hands-on sandboxes to demonstrate Docker caching optimization, port forwarding mechanics, and container process isolation.
          </p>
          
          <div class="lab-selector" role="tablist" aria-label="Select Lab Simulator">
            <button class="lab-select-btn active" data-lab="cache" role="tab" aria-selected="true" type="button">Dockerfile Caching</button>
            <button class="lab-select-btn" data-lab="port" role="tab" aria-selected="false" type="button">Port Forwarding</button>
            <button class="lab-select-btn" data-lab="volumes" role="tab" aria-selected="false" type="button">Docker Volumes</button>
            <button class="lab-select-btn" data-lab="isolation" role="tab" aria-selected="false" type="button">Container Isolation</button>
            <button class="lab-select-btn" data-lab="compose" role="tab" aria-selected="false" type="button">Docker Compose</button>
            <button class="lab-select-btn" data-lab="multistage" role="tab" aria-selected="false" type="button">Multi-Stage Build</button>
          </div>

          <!-- Lab Configurations -->
          <div class="lab-config-wrapper">
            <!-- Caching Configuration -->
            <div id="config-cache" class="lab-config-panel">
              <h3>Docker Layer Optimization</h3>
              <p>Observe how file execution order invalidates cached stacks. In unoptimized builds, modifying any code file triggers npm installs from scratch.</p>
              
              <div class="radio-card-group">
                <label class="radio-card">
                  <input type="radio" name="cacheRecipe" value="unoptimized" checked>
                  <div class="radio-card-content">
                    <strong>Unoptimized Sequence</strong>
                    <span>COPY . . happens BEFORE RUN npm install.</span>
                  </div>
                </label>
                <label class="radio-card">
                  <input type="radio" name="cacheRecipe" value="optimized">
                  <div class="radio-card-content">
                    <strong>Optimized Sequence</strong>
                    <span>COPY package files, run install, then copy code.</span>
                  </div>
                </label>
              </div>

              <div class="lab-btn-row">
                <button class="primary-action" id="btnRunCacheBuild" type="button">Build Docker Image</button>
                <button class="secondary-action" id="btnEditCode" type="button">Modify server.js (Change Code)</button>
              </div>
            </div>

            <!-- Port Configuration -->
            <div id="config-port" class="lab-config-panel" style="display: none;">
              <h3>Port Forwarding Router</h3>
              <p>Expose isolated networks. Map a port on your host machine to route traffic into the container's interior port (default 80).</p>
              
              <div class="port-inputs-grid">
                <div class="port-input-box">
                  <label for="inputHostPort">Host Port (-p)</label>
                  <input type="number" id="inputHostPort" value="8080" min="80" max="65535">
                  <small>Incoming browser port</small>
                </div>
                <div class="port-input-box">
                  <label for="inputContainerPort">Container Port</label>
                  <input type="number" id="inputContainerPort" value="80" min="80" max="65535">
                  <small>Internal listening port</small>
                </div>
              </div>

              <div class="lab-btn-row">
                <button class="primary-action" id="btnSendPortRequest" type="button">Send HTTP Request</button>
                <button class="secondary-action" id="btnResetPortLab" type="button">Reset Port Settings</button>
              </div>
            </div>

            <!-- Volumes Configuration -->
            <div id="config-volumes" class="lab-config-panel" style="display: none;">
              <h3>Docker Volumes Simulator</h3>
              <p>Compare ephemeral storage vs persistent storage. Map folders inside the container to persistent directories on the Host machine.</p>
              
              <div class="checkbox-option">
                <label class="checkbox-card">
                  <input type="checkbox" id="chkMountVolume" checked>
                  <div class="checkbox-card-content">
                    <strong>Mount Persistent Volume</strong>
                    <span>Map volume <code>shared-logs</code> directly to container directory <code>/app/logs</code>.</span>
                  </div>
                </label>
              </div>

              <div class="lab-btn-row">
                <button class="primary-action" id="btnSpawnVolumeContainer" type="button">docker run -d -v shared-logs:/app/logs</button>
                <button class="secondary-action" id="btnWriteVolumeFile" type="button">+ Write Log File</button>
                <button class="secondary-action" id="btnDeleteVolumeContainer" type="button">docker rm -f</button>
              </div>
            </div>

            <!-- Isolation Configuration -->
            <div id="config-isolation" class="lab-config-panel" style="display: none;">
              <h3>Namespace Isolation Sandbox</h3>
              <p>Spawn unique runtime containers from the same base image blueprint. Verify that filesystem folders remain isolated inside separate sandboxes.</p>
              
              <div class="lab-btn-row">
                <button class="primary-action" id="btnSpawnContainer" type="button">docker run -d checkout-api</button>
                <button class="secondary-action" id="btnResetIsolationLab" type="button">Purge All Containers</button>
              </div>
            </div>

            <!-- Compose Configuration -->
            <div id="config-compose" class="lab-config-panel" style="display: none;">
              <h3>Docker Compose Networking</h3>
              <p>Launch multiple services in a custom virtual bridge network. Services resolve each other by service hostnames using internal Docker DNS.</p>
              
              <div class="lab-btn-row">
                <button class="primary-action" id="btnComposeUp" type="button">docker compose up -d</button>
                <button class="primary-action" id="btnComposeRequest" type="button" disabled>Send Request (Client ➔ Proxy)</button>
                <button class="secondary-action" id="btnComposeDown" type="button">docker compose down</button>
              </div>
            </div>

            <!-- Multistage Configuration -->
            <div id="config-multistage" class="lab-config-panel" style="display: none;">
              <h3>Multi-Stage Build Optimizer</h3>
              <p>Compare Single-Stage vs Multi-Stage footprints. Compiling inside a temporary builder stage strips out heavy compilers, package caches, and devDependencies from your final run-time image.</p>
              
              <div class="radio-card-group">
                <label class="radio-card">
                  <input type="radio" name="multistageMode" value="single" checked>
                  <div class="radio-card-content">
                    <strong>Single-Stage Image</strong>
                    <span>Build compiles and runs inside same runtime environment. Size: 1.04 GB.</span>
                  </div>
                </label>
                <label class="radio-card">
                  <input type="radio" name="multistageMode" value="multi">
                  <div class="radio-card-content">
                    <strong>Multi-Stage Image</strong>
                    <span>Compiles in builder, then copies final binaries to lightweight runner. Size: 162 MB.</span>
                  </div>
                </label>
              </div>

              <div class="lab-btn-row">
                <button class="primary-action" id="btnRunMultistageBuild" type="button">Build Docker Image</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column: Animated Visual Stage -->
      <div id="visualStage" class="visual-stage reveal stage--walkthrough" aria-label="Visual animation screen">
        <div class="stage-grid"></div>
        <div class="build-pulse"></div>
        <div class="whale-mark" aria-hidden="true">
          <span></span><span></span><span></span><span></span>
        </div>

        <!-- 1. Walkthrough Stage Elements -->
        <div class="walkthrough-elements-wrapper">
          <div class="machine-track" aria-hidden="true">
            <span class="track-dot dot-one"></span>
            <span class="track-dot dot-two"></span>
            <span class="track-dot dot-three"></span>
            <span class="track-dot dot-four"></span>
          </div>

          <section class="process-zone process-zone--app" data-focus="app">
            <span class="zone-label">Build Context</span>
            <div class="file-cloud">
              ${appFiles.map((file, index) => `<span style="--i:${index}">${file}</span>`).join('')}
            </div>
            <div class="dependency-orbit">
              <i>runtime</i>
              <i>deps</i>
              <i>config</i>
            </div>
          </section>

          <section class="process-zone process-zone--dockerfile" data-focus="dockerfile">
            <span class="zone-label">Dockerfile</span>
            <div class="scanner-shell">
              <div class="scanner-beam"></div>
              <code>FROM node</code>
              <code>WORKDIR /app</code>
              <code>COPY . .</code>
              <code>RUN npm ci</code>
              <code>CMD start</code>
            </div>
          </section>

          <section class="process-zone process-zone--image" data-focus="image">
            <span class="zone-label">Docker Image</span>
            <div class="image-assembler">
              ${imageLayers.map((layer, index) => `<span style="--layer:${index}">${layer}</span>`).join('')}
            </div>
            <div class="image-seal">read-only blueprint</div>
          </section>

          <section class="process-zone process-zone--container" data-focus="container scale">
            <span class="zone-label">Runtime</span>
            <div class="launch-beam"></div>
            <div class="container-bay">
              <div class="container-unit container-unit--main">
                <span class="container-lid"></span>
                <b>checkout-api</b>
                <small>running :8080</small>
                <i class="port-line"></i>
              </div>
              <div class="container-unit clone clone--one"><b>worker</b></div>
              <div class="container-unit clone clone--two"><b>web</b></div>
              <div class="container-unit clone clone--three"><b>cron</b></div>
            </div>
            <div class="isolation-bubbles">
              <span>process</span>
              <span>filesystem</span>
              <span>network</span>
            </div>
          </section>
        </div>

        <!-- 2. Caching Lab Stage Views -->
        <div class="lab-stage-wrapper lab-stage-wrapper--cache">
          <div class="stage-section-header">Image Cache Assembler</div>
          <div class="cache-sandbox-flex">
            <div class="cache-terminal-box">
              <div class="terminal-bar"><span></span><span></span><span></span></div>
              <div class="terminal-screen" id="cacheTerminalLog">$ Select a recipe and click Build Image</div>
            </div>
            <div class="cache-stack-visualizer" id="cacheLayerStack">
              <!-- Rendered dynamically depending on recipe selection -->
            </div>
          </div>
        </div>

        <!-- 3. Port Forwarding Stage Views -->
        <div class="lab-stage-wrapper lab-stage-wrapper--port">
          <div class="stage-section-header">Port Mapping Route</div>
          <div class="port-sandbox-flex">
            <div class="port-machine host-node">
              <h5>Host Machine</h5>
              <div class="browser-shell">
                <div class="browser-address-header">
                  <span class="dot-btn red"></span>
                  <span class="dot-btn yellow"></span>
                  <span class="dot-btn green"></span>
                  <div class="address-box-url">http://localhost:<span id="lblHostPort">8080</span></div>
                </div>
                <div class="browser-frame-viewport" id="browserFrameViewport">
                  Ready to send query...
                </div>
              </div>
            </div>
            
            <div class="routing-cable-lane">
              <div class="routing-cable-wire"></div>
              <div id="networkPacketDot" class="network-packet-dot"></div>
            </div>

            <div class="port-machine container-node">
              <h5>Docker Container</h5>
              <div class="port-container-shell">
                <span class="container-card-lid"></span>
                <strong>checkout-api</strong>
                <div class="container-listen-label">listen: <span id="lblContainerPort">80</span></div>
              </div>
            </div>
          </div>
          <div class="port-console-log" id="portConsoleLog">
            Ready to route packets.
          </div>
        </div>

        <!-- 4. Volumes Stage Views -->
        <div class="lab-stage-wrapper lab-stage-wrapper--volumes">
          <div class="stage-section-header">Persistent Storage Map</div>
          <div class="volumes-sandbox-layout">
            <div class="volumes-grid">
              <!-- Container Space -->
              <div class="volumes-grid-node volumes-grid-node--container">
                <h5>Container Namespace</h5>
                <div class="vol-container-card" id="volContainerCard">
                  <div class="vol-card-empty">Container offline. Click Spawn below.</div>
                </div>
              </div>
              
              <!-- Mount Connection wire -->
              <div class="vol-mount-wire-lane">
                <div class="vol-mount-wire-line" id="volMountWireLine"></div>
                <div class="vol-mount-packet" id="volMountPacket"></div>
              </div>

              <!-- Host Directory -->
              <div class="volumes-grid-node volumes-grid-node--host">
                <h5>Host Directory (/var/lib/docker/volumes)</h5>
                <div class="vol-host-storage-card">
                  <div class="vol-host-header">
                    <span class="vol-host-sys-icon">📁</span>
                    <strong>shared-logs/_data</strong>
                  </div>
                  <div class="vol-host-body">
                    <ul id="volHostFileList" class="vol-host-file-list">
                      <li class="empty-vol-msg">No persistent volume files created.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="vol-terminal-log-box">
              <div class="terminal-bar"><span></span><span></span><span></span></div>
              <div class="terminal-screen" id="volTerminalLog">$ Ready. Deploy container instance.</div>
            </div>
          </div>
        </div>

        <!-- 5. Namespace Isolation Stage Views -->
        <div class="lab-stage-wrapper lab-stage-wrapper--isolation">
          <div class="stage-section-header">Namespace Kernel Sandbox</div>
          <div class="isolation-sandbox-flex">
            <div class="isolation-sidebar-layout">
              <div class="image-blueprint-card">
                <h6>Base Image Blueprint</h6>
                <div class="blueprint-layer-line">Layer 3: CMD node server.js</div>
                <div class="blueprint-layer-line">Layer 2: COPY /src files</div>
                <div class="blueprint-layer-line">Layer 1: RUN npm ci</div>
                <div class="blueprint-layer-line">Layer 0: FROM node:22-alpine</div>
              </div>
              <div id="isolationContainersPool" class="sandbox-instances-pool">
                <div id="isolationPoolEmptyState" class="pool-empty-card">
                  No active containers spawned. Click spawn to allocate isolated namespaces.
                </div>
              </div>
            </div>
            <div class="isolation-terminal-box">
              <div class="terminal-bar"><span></span><span></span><span></span></div>
              <div class="terminal-screen" id="isolationTerminalLog">$ docker ps -a</div>
            </div>
          </div>
        </div>

        <!-- 6. Compose Stage Views -->
        <div class="lab-stage-wrapper lab-stage-wrapper--compose">
          <div class="stage-section-header">Docker Compose bridge routing network</div>
          <div class="compose-sandbox-layout">
            <div class="compose-network-flow">
              <!-- Outside Client Browser -->
              <div class="compose-browser-client-node">
                <div class="compose-browser-frame">
                  <h6>Client Browser</h6>
                  <div class="compose-browser-address">http://localhost:80</div>
                  <div class="compose-browser-response-view" id="composeBrowserResponse">
                    Inactive. Deploy compose environment.
                  </div>
                </div>
                <div class="compose-route-cable">
                  <div class="compose-cable-line"></div>
                  <div class="compose-packet-dot packet-dot--outer" id="composePacketOuter"></div>
                </div>
              </div>

              <!-- Bridge Network boundary wrapper -->
              <div class="compose-bridge-network-box">
                <div class="compose-bridge-label">Bridge Network: app-bridge (172.20.0.0/16)</div>
                <div class="compose-bridge-grid">
                  <!-- proxy server -->
                  <div class="compose-service-unit service-unit--proxy" id="cserv-proxy">
                    <span class="unit-status-dot"></span>
                    <strong>proxy (nginx)</strong>
                    <small>IP: 172.20.0.2</small>
                    <small>Bound: host:80 ➔ proxy:80</small>
                  </div>
                  <div class="compose-bridge-cable compose-bridge-cable--proxy-api">
                    <div class="compose-cable-line"></div>
                    <div class="compose-packet-dot" id="composePacketProxyApi"></div>
                  </div>

                  <!-- backend api -->
                  <div class="compose-service-unit service-unit--api" id="cserv-api">
                    <span class="unit-status-dot"></span>
                    <strong>api-server (Node)</strong>
                    <small>IP: 172.20.0.3</small>
                    <small>Listening: 8080</small>
                  </div>
                  <div class="compose-bridge-cable compose-bridge-cable--api-db">
                    <div class="compose-cable-line"></div>
                    <div class="compose-packet-dot" id="composePacketApiDb"></div>
                  </div>

                  <!-- postgres db -->
                  <div class="compose-service-unit service-unit--db" id="cserv-db">
                    <span class="unit-status-dot"></span>
                    <strong>database (postgres)</strong>
                    <small>IP: 172.20.0.4</small>
                    <small>Listening: 5432</small>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="compose-console-terminal-box">
              <div class="terminal-bar"><span></span><span></span><span></span></div>
              <div class="terminal-screen" id="composeTerminalLog">$ docker compose ps</div>
            </div>
          </div>
        </div>

        <!-- 7. Multistage Stage Views -->
        <div class="lab-stage-wrapper lab-stage-wrapper--multistage">
          <div class="stage-section-header">Image build size footprint optimizer</div>
          <div class="multistage-sandbox-layout">
            <div class="multistage-comparisons-grid">
              <!-- Left Stack visualizer -->
              <div class="multistage-layer-stack-lane">
                <h6 id="multistageLayersTitle">Single-Stage Layers</h6>
                <div class="multistage-visual-layer-stack" id="multistageLayerStack">
                  <!-- Rendered dynamically -->
                </div>
              </div>

              <!-- Right Size comparative meter -->
              <div class="multistage-size-meter-lane">
                <h6>Virtual Image Footprint</h6>
                <div class="multistage-bar-meter-outline">
                  <div class="multistage-bar-meter-fill" id="msMeterFill"></div>
                  <div class="multistage-bar-meter-label" id="msMeterLabel">0 MB</div>
                </div>
                <div class="multistage-optimized-badge" id="msOptimizationBadge">Size Optimization</div>
              </div>
            </div>
            
            <div class="multistage-console-terminal-box">
              <div class="terminal-bar"><span></span><span></span><span></span></div>
              <div class="terminal-screen" id="multistageTerminalLog">$ Select builder recipe and click build.</div>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- Interactive timeline explainer (Visible in walkthrough mode) -->
    <section class="explainer reveal" id="walkthroughTimeline" aria-label="Containerisation steps">
      <div class="step-panel">
        <p class="step-panel__eyebrow" id="stepEyebrow">${steps[0].eyebrow}</p>
        <h2 id="stepTitle">${steps[0].title}</h2>
        <p id="stepBody">${steps[0].body}</p>
        <code id="stepCommand">${steps[0].command}</code>
        <div class="hero__actions" aria-label="Walkthrough controls" style="margin-top: 28px;">
          <button class="primary-action" id="playFlow" type="button">Play walkthrough</button>
          <button class="secondary-action" id="resetFlow" type="button">Reset</button>
        </div>
        <div class="progress-bar-container" style="margin-top: 18px;">
          <div id="progressBarFill" class="progress-bar-fill"></div>
        </div>
      </div>

      <div class="timeline" role="tablist" aria-label="Docker workflow steps">
        ${steps
          .map(
            (step, index) => `
              <button class="timeline__step ${index === 0 ? 'is-active' : ''}" type="button" data-step="${index}" role="tab" aria-selected="${index === 0}">
                <span>${String(index + 1).padStart(2, '0')}</span>
                ${step.title}
              </button>
            `,
          )
          .join('')}
      </div>
    </section>

    <!-- Deep Dive Info Blocks -->
    <section class="deep-dive reveal" id="deepDiveSection" aria-labelledby="deep-title">
      <div class="section-heading">
        <p class="kicker">Detailed Build To Runtime Flow</p>
        <h2 id="deep-title">Every Docker step, shown as an artifact change.</h2>
        <p>
          Follow the chain from project files to image layers to a running, networked, configurable,
          and scalable containerised application.
        </p>
      </div>
      <div class="detail-flow">
        ${deepDiveSteps
          .map(
            (step) => `
              <article class="detail-card detail-card--${step.visual}" id="card-${step.visual}">
                <div class="detail-card__visual" aria-hidden="true">
                  ${visualMarkup[step.visual]}
                </div>
                <div class="detail-card__copy">
                  <span class="detail-number">${step.number}</span>
                  <p class="detail-label">${step.label}</p>
                  <h3>${step.title}</h3>
                  <p>${step.summary}</p>
                  <code>${step.command}</code>
                  <ul>
                    ${step.points.map((point) => `<li>${point}</li>`).join('')}
                  </ul>
                </div>
              </article>
            `,
          )
          .join('')}
      </div>
    </section>
  </main>
`;

// ==========================================
// STATE VARIABLES & DOM REFERENCES
// ==========================================
let activeStep = 0;
let walkthroughTimer = null;
let walkthroughStartTime = null;
let walkthroughRemainingTime = 0;
let isPlaying = false;
let isPaused = false;
let currentMode = 'walkthrough'; // walkthrough | lab
let currentLab = 'cache'; // cache | port | volumes | isolation | compose | multistage

const root = document.documentElement;
const visualStage = document.querySelector('#visualStage');
const panelWalkthrough = document.querySelector('#panelWalkthrough');
const panelLab = document.querySelector('#panelLab');
const walkthroughTimeline = document.querySelector('#walkthroughTimeline');

const stepEyebrow = document.querySelector('#stepEyebrow');
const stepTitle = document.querySelector('#stepTitle');
const stepBody = document.querySelector('#stepBody');
const stepCommand = document.querySelector('#stepCommand');
const timelineButtons = [...document.querySelectorAll('.timeline__step')];
const playFlow = document.querySelector('#playFlow');
const resetFlow = document.querySelector('#resetFlow');
const progressBarFill = document.querySelector('#progressBarFill');

// Switcher controls
const btnModeWalkthrough = document.querySelector('#btnModeWalkthrough');
const btnModeLab = document.querySelector('#btnModeLab');

// ==========================================
// GUIDED WALKTHROUGH CONTROLS
// ==========================================
function setStep(index) {
  activeStep = index;
  const step = steps[index];

  root.dataset.focus = step.focus;
  root.dataset.step = String(index + 1);
  stepEyebrow.textContent = step.eyebrow;
  stepTitle.textContent = step.title;
  stepBody.textContent = step.body;
  stepCommand.textContent = step.command;

  document.querySelectorAll('[data-focus]').forEach((item) => {
    const values = item.dataset.focus.split(' ');
    item.classList.toggle('is-focused', values.includes(step.focus));
  });

  timelineButtons.forEach((button, buttonIndex) => {
    const isActive = buttonIndex === index;
    button.classList.toggle('is-active', isActive);
    button.setAttribute('aria-selected', String(isActive));
  });

  // Sync timeline button focus (a11y)
  if (document.activeElement && document.activeElement.classList.contains('timeline__step')) {
    timelineButtons[index].focus();
  }

  // Highlight corresponding deep dive card if it matches the current focus
  document.querySelectorAll('.detail-card').forEach((card) => {
    card.classList.remove('card-highlight');
  });
  const mappedCard = document.querySelector(`#card-${step.focus}`);
  if (mappedCard) {
    mappedCard.classList.add('card-highlight');
  }

  // Reset progress bar on manual selection
  if (!isPlaying || isPaused) {
    progressBarFill.style.transition = 'none';
    progressBarFill.style.width = '0%';
  }
}

function startStepTimer(duration) {
  // Clear any existing timer
  clearTimeout(walkthroughTimer);
  walkthroughStartTime = Date.now();
  walkthroughRemainingTime = duration;

  // Animate progress bar fill using CSS transition
  progressBarFill.style.transition = 'none';
  progressBarFill.style.width = '0%';
  
  // Force a reflow
  progressBarFill.offsetHeight;

  progressBarFill.style.transition = `width ${duration}ms linear`;
  progressBarFill.style.width = '100%';

  walkthroughTimer = setTimeout(() => {
    const next = activeStep + 1;
    if (next >= steps.length) {
      isPlaying = false;
      isPaused = false;
      playFlow.textContent = 'Replay walkthrough';
      progressBarFill.style.transition = 'none';
      progressBarFill.style.width = '100%';
      return;
    }
    setStep(next);
    startStepTimer(steps[next].duration);
  }, duration);
}

function pauseWalkthrough() {
  clearTimeout(walkthroughTimer);
  isPaused = true;
  playFlow.textContent = 'Resume';

  // Freeze progress bar at current width percentage
  const elapsed = Date.now() - walkthroughStartTime;
  walkthroughRemainingTime = Math.max(0, walkthroughRemainingTime - elapsed);
  
  const widthPercentage = ((steps[activeStep].duration - walkthroughRemainingTime) / steps[activeStep].duration) * 100;
  progressBarFill.style.transition = 'none';
  progressBarFill.style.width = `${widthPercentage}%`;
}

function resumeWalkthrough() {
  isPaused = false;
  playFlow.textContent = 'Pause';
  
  // Resume progress bar animation from current state
  progressBarFill.offsetHeight; // Force reflow
  progressBarFill.style.transition = `width ${walkthroughRemainingTime}ms linear`;
  progressBarFill.style.width = '100%';

  walkthroughStartTime = Date.now();
  walkthroughTimer = setTimeout(() => {
    const next = activeStep + 1;
    if (next >= steps.length) {
      isPlaying = false;
      isPaused = false;
      playFlow.textContent = 'Replay walkthrough';
      progressBarFill.style.width = '100%';
      return;
    }
    setStep(next);
    startStepTimer(steps[next].duration);
  }, walkthroughRemainingTime);
}

function play() {
  if (isPlaying) {
    if (isPaused) {
      resumeWalkthrough();
    } else {
      pauseWalkthrough();
    }
    return;
  }

  // If at the end, start from 0
  if (activeStep >= steps.length - 1) {
    setStep(0);
  }

  isPlaying = true;
  isPaused = false;
  playFlow.textContent = 'Pause';
  startStepTimer(steps[activeStep].duration);
}

function stopWalkthrough() {
  clearTimeout(walkthroughTimer);
  isPlaying = false;
  isPaused = false;
  playFlow.textContent = 'Play walkthrough';
  progressBarFill.style.transition = 'none';
  progressBarFill.style.width = '0%';
}

playFlow.addEventListener('click', play);

resetFlow.addEventListener('click', () => {
  stopWalkthrough();
  setStep(0);
});

timelineButtons.forEach((button) => {
  button.addEventListener('click', () => {
    stopWalkthrough();
    setStep(Number(button.dataset.step));
  });

  // Support Arrow Key navigation on timeline buttons
  button.addEventListener('keydown', (e) => {
    let index = Number(button.dataset.step);
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      index = (index + 1) % steps.length;
      stopWalkthrough();
      setStep(index);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      index = (index - 1 + steps.length) % steps.length;
      stopWalkthrough();
      setStep(index);
    }
  });
});

// Sync deep dive card clicks to main visualizer step
const cardToStepMap = {
  'context': 0,
  'ignore': 1,
  'base': 2,
  'copy': 3,
  'run': 4,
  'cmd': 5,
  'artifact': 4,
  'writable': 5,
  'isolation': 5,
  'ports': 6,
  'volumes': 6,
  'replicas': 7,
};

document.querySelectorAll('.detail-card').forEach((card) => {
  card.style.cursor = 'pointer';
  card.addEventListener('click', () => {
    const visualClass = [...card.classList].find(c => c.startsWith('detail-card--'));
    if (visualClass) {
      const type = visualClass.replace('detail-card--', '');
      const matchedStep = cardToStepMap[type];
      if (matchedStep !== undefined) {
        // Toggle back to Walkthrough mode if in Lab mode
        if (currentMode !== 'walkthrough') {
          switchMode('walkthrough');
        }
        stopWalkthrough();
        setStep(matchedStep);
        document.querySelector('.hero').scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});

// ==========================================
// MODE SWITCHER MANAGEMENT
// ==========================================
function switchMode(mode) {
  currentMode = mode;
  
  if (mode === 'walkthrough') {
    btnModeWalkthrough.classList.add('active');
    btnModeWalkthrough.setAttribute('aria-selected', 'true');
    btnModeLab.classList.remove('active');
    btnModeLab.setAttribute('aria-selected', 'false');

    panelWalkthrough.style.display = 'block';
    panelLab.style.display = 'none';
    walkthroughTimeline.style.display = 'grid';

    visualStage.className = 'visual-stage stage--walkthrough';
    setStep(activeStep);
  } else {
    btnModeWalkthrough.classList.remove('active');
    btnModeWalkthrough.setAttribute('aria-selected', 'false');
    btnModeLab.classList.add('active');
    btnModeLab.setAttribute('aria-selected', 'true');

    panelWalkthrough.style.display = 'none';
    panelLab.style.display = 'block';
    walkthroughTimeline.style.display = 'none';

    stopWalkthrough();
    switchLab(currentLab);
  }
}

btnModeWalkthrough.addEventListener('click', () => switchMode('walkthrough'));
btnModeLab.addEventListener('click', () => switchMode('lab'));

// ==========================================
// INTERACTIVE LAB SELECTOR
// ==========================================
const labSelectButtons = [...document.querySelectorAll('.lab-select-btn')];
const configPanels = {
  cache: document.querySelector('#config-cache'),
  port: document.querySelector('#config-port'),
  volumes: document.querySelector('#config-volumes'),
  isolation: document.querySelector('#config-isolation'),
  compose: document.querySelector('#config-compose'),
  multistage: document.querySelector('#config-multistage'),
};

function switchLab(lab) {
  currentLab = lab;
  
  // Highlight tab
  labSelectButtons.forEach((btn) => {
    const isActive = btn.dataset.lab === lab;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-selected', String(isActive));
  });

  // Toggle config panels
  Object.keys(configPanels).forEach((key) => {
    configPanels[key].style.display = key === lab ? 'block' : 'none';
  });

  // Set visual stage class
  visualStage.className = `visual-stage stage--lab-${lab}`;

  // Trigger lab-specific setup
  if (lab === 'cache') {
    renderCacheLayers();
  } else if (lab === 'port') {
    resetPortForwardingLab();
  } else if (lab === 'volumes') {
    resetVolumesLab();
  } else if (lab === 'isolation') {
    renderIsolationContainers();
  } else if (lab === 'compose') {
    resetComposeLab();
  } else if (lab === 'multistage') {
    renderMultistageLayers();
  }
}

labSelectButtons.forEach((btn) => {
  btn.addEventListener('click', () => switchLab(btn.dataset.lab));
});


// ==========================================
// PLAYGROUND 1: DOCKERFILE CACHING SIMULATOR
// ==========================================
const btnRunCacheBuild = document.querySelector('#btnRunCacheBuild');
const btnEditCode = document.querySelector('#btnEditCode');
const cacheTerminalLog = document.querySelector('#cacheTerminalLog');
const cacheLayerStack = document.querySelector('#cacheLayerStack');
let hasCodeChanges = false;
let isBuildingCache = false;

const cacheRecipes = {
  unoptimized: [
    { text: 'FROM node:22-alpine', action: 'FROM node:22-alpine', cacheKey: 'base' },
    { text: 'WORKDIR /app', action: 'WORKDIR /app', cacheKey: 'base' },
    { text: 'COPY . .', action: 'COPY . .', cacheKey: 'code' },
    { text: 'RUN npm ci', action: 'RUN npm ci', cacheKey: 'packages' },
    { text: 'CMD ["node", "server.js"]', action: 'CMD node server', cacheKey: 'cmd' }
  ],
  optimized: [
    { text: 'FROM node:22-alpine', action: 'FROM node:22-alpine', cacheKey: 'base' },
    { text: 'WORKDIR /app', action: 'WORKDIR /app', cacheKey: 'base' },
    { text: 'COPY package*.json ./', action: 'COPY package*.json ./', cacheKey: 'manifest' },
    { text: 'RUN npm ci', action: 'RUN npm ci', cacheKey: 'packages' },
    { text: 'COPY . .', action: 'COPY . .', cacheKey: 'code' },
    { text: 'CMD ["node", "server.js"]', action: 'CMD node server', cacheKey: 'cmd' }
  ]
};

function getActiveRecipe() {
  const selected = document.querySelector('input[name="cacheRecipe"]:checked');
  return selected ? selected.value : 'unoptimized';
}

function renderCacheLayers() {
  const recipeType = getActiveRecipe();
  const layers = cacheRecipes[recipeType];
  
  cacheLayerStack.innerHTML = layers.map((layer, index) => {
    return `<div class="cache-layer" id="clayer-${index}"><code>${layer.text}</code></div>`;
  }).join('');
}

// Re-render layer layouts dynamically on recipe toggle
document.querySelectorAll('input[name="cacheRecipe"]').forEach((radio) => {
  radio.addEventListener('change', () => {
    if (!isBuildingCache) {
      renderCacheLayers();
      cacheTerminalLog.innerHTML = `$ Ready to build container image.`;
    }
  });
});

btnEditCode.addEventListener('click', () => {
  if (isBuildingCache) return;
  hasCodeChanges = true;
  cacheTerminalLog.innerHTML = `<span class="terminal-text--alert">> [Source Code modified] Edited server.js. Saved local file.</span>\n$ Ready to run build.`;
  
  // Visual cue on the edit button
  btnEditCode.classList.add('pulse-glow');
  setTimeout(() => btnEditCode.classList.remove('pulse-glow'), 1000);
});

function runCacheBuild() {
  if (isBuildingCache) return;
  isBuildingCache = true;
  btnRunCacheBuild.disabled = true;
  btnEditCode.disabled = true;
  
  const recipeType = getActiveRecipe();
  const layers = cacheRecipes[recipeType];
  
  cacheTerminalLog.innerHTML = `$ docker build -t checkout-api:latest .\nSending build context to Docker daemon... 2.4MB\n`;
  renderCacheLayers(); // reset views

  let currentLayerIdx = 0;
  let cacheInvalidated = false;

  function buildNextLayer() {
    if (currentLayerIdx >= layers.length) {
      cacheTerminalLog.innerHTML += `\nSuccessfully tagged checkout-api:latest\nSuccessfully built image.`;
      isBuildingCache = false;
      btnRunCacheBuild.disabled = false;
      btnEditCode.disabled = false;
      hasCodeChanges = false; // reset changes
      return;
    }

    const layer = layers[currentLayerIdx];
    const domLayer = document.querySelector(`#clayer-${currentLayerIdx}`);
    let isCached = false;

    // Cache logic assessment
    if (!hasCodeChanges) {
      isCached = true;
    } else {
      if (recipeType === 'unoptimized') {
        if (layer.cacheKey === 'code') {
          cacheInvalidated = true;
        }
        isCached = !cacheInvalidated;
      } else {
        if (layer.cacheKey === 'code') {
          cacheInvalidated = true;
        }
        isCached = !cacheInvalidated;
      }
    }

    // Update log
    const stepNum = currentLayerIdx + 1;
    if (isCached) {
      domLayer.classList.add('layer--cached');
      cacheTerminalLog.innerHTML += `\nStep ${stepNum}/${layers.length} : ${layer.action}\n ---> <span class="terminal-text--cached">Using cache</span>`;
      setTimeout(buildNextLayer, 300);
    } else {
      domLayer.classList.add('layer--built');
      cacheTerminalLog.innerHTML += `\nStep ${stepNum}/${layers.length} : ${layer.action}\n ---> <span class="terminal-text--miss">Cache Miss (Rebuilding...)</span>`;
      
      const delay = (layer.cacheKey === 'packages') ? 1600 : 600;
      if (layer.cacheKey === 'packages') {
        cacheTerminalLog.innerHTML += `\n<span class="terminal-text--sub">  npm ci: fetching dependencies from npm registry...</span>`;
      }
      setTimeout(buildNextLayer, delay);
    }
    
    cacheTerminalLog.scrollTop = cacheTerminalLog.scrollHeight;
    currentLayerIdx++;
  }

  setTimeout(buildNextLayer, 600);
}

btnRunCacheBuild.addEventListener('click', runCacheBuild);


// ==========================================
// PLAYGROUND 2: PORT FORWARDING ROUTER
// ==========================================
const btnSendPortRequest = document.querySelector('#btnSendPortRequest');
const btnResetPortLab = document.querySelector('#btnResetPortLab');
const inputHostPort = document.querySelector('#inputHostPort');
const inputContainerPort = document.querySelector('#inputContainerPort');
const lblHostPort = document.querySelector('#lblHostPort');
const lblContainerPort = document.querySelector('#lblContainerPort');
const browserFrameViewport = document.querySelector('#browserFrameViewport');
const portConsoleLog = document.querySelector('#portConsoleLog');
const networkPacketDot = document.querySelector('#networkPacketDot');
let isRoutingPacket = false;

function resetPortForwardingLab() {
  isRoutingPacket = false;
  btnSendPortRequest.disabled = false;
  networkPacketDot.className = 'network-packet-dot';
  networkPacketDot.style.left = '0%';
  
  lblHostPort.textContent = inputHostPort.value;
  lblContainerPort.textContent = inputContainerPort.value;
  browserFrameViewport.innerHTML = `Ready to ping container. Click Send Request.`;
  portConsoleLog.innerHTML = `Configure ports and hit "Send HTTP Request".\nContainer process is listening on Port 80.`;
}

function runPortRoutingTest() {
  if (isRoutingPacket) return;
  isRoutingPacket = true;
  btnSendPortRequest.disabled = true;

  const hostPort = Number(inputHostPort.value);
  const containerPort = Number(inputContainerPort.value);

  lblHostPort.textContent = hostPort;
  lblContainerPort.textContent = containerPort;

  portConsoleLog.innerHTML = `Running command:\n<span class="cmd-text">$ curl -v http://localhost:${hostPort}</span>\n* Reconstructing request packet...`;
  browserFrameViewport.innerHTML = `<span class="viewport-text--loading">Connecting...</span>`;

  networkPacketDot.classList.add('packet--animating');
  const isMatch = (containerPort === 80);

  setTimeout(() => {
    if (isMatch) {
      networkPacketDot.style.left = '100%';
      setTimeout(() => {
        networkPacketDot.className = 'network-packet-dot packet--success';
        
        portConsoleLog.innerHTML += `\n* Connected to host port ${hostPort}\n* Forwarded via Docker Bridge ➔ container:80\n<span class="terminal-text--cached">< HTTP/1.1 200 OK</span>\nResponse: {"status":"active","process":"Node22"}`;
        browserFrameViewport.innerHTML = `
          <div class="viewport-response viewport-response--success">
            <strong>HTTP 200 OK</strong>
            <p>Connection Established!</p>
            <small>checkout-api responded successfully from inside isolated container.</small>
          </div>
        `;
        isRoutingPacket = false;
        btnSendPortRequest.disabled = false;
      }, 1000);
    } else {
      networkPacketDot.style.left = '50%';
      setTimeout(() => {
        networkPacketDot.className = 'network-packet-dot packet--fail';

        portConsoleLog.innerHTML += `\n* Connected to host port ${hostPort}\n* Forwarding to container:${containerPort}\n<span class="terminal-text--miss">! Connection Refused (Port ${containerPort} not listening)</span>\nError: No service is bound to container port ${containerPort}.`;
        browserFrameViewport.innerHTML = `
          <div class="viewport-response viewport-response--fail">
            <strong>ERR_CONNECTION_REFUSED</strong>
            <p>Could not connect to server.</p>
            <small>Traffic forwarded to container port ${containerPort}, but checkout-api listens on port 80.</small>
          </div>
        `;
        isRoutingPacket = false;
        btnSendPortRequest.disabled = false;
      }, 800);
    }
  }, 1000);
}

btnSendPortRequest.addEventListener('click', runPortRoutingTest);
btnResetPortLab.addEventListener('click', resetPortForwardingLab);

inputHostPort.addEventListener('input', () => {
  lblHostPort.textContent = inputHostPort.value;
});
inputContainerPort.addEventListener('input', () => {
  lblContainerPort.textContent = inputContainerPort.value;
});


// ==========================================
// PLAYGROUND 3: DOCKER VOLUMES LAB
// ==========================================
const btnSpawnVolumeContainer = document.querySelector('#btnSpawnVolumeContainer');
const btnWriteVolumeFile = document.querySelector('#btnWriteVolumeFile');
const btnDeleteVolumeContainer = document.querySelector('#btnDeleteVolumeContainer');
const chkMountVolume = document.querySelector('#chkMountVolume');
const volContainerCard = document.querySelector('#volContainerCard');
const volHostFileList = document.querySelector('#volHostFileList');
const volTerminalLog = document.querySelector('#volTerminalLog');
const volMountPacket = document.querySelector('#volMountPacket');
const volMountWireLine = document.querySelector('#volMountWireLine');

let isVolContainerActive = false;
let isVolMounted = false;
let volContainerFiles = [];
let volHostFiles = [];
let isWritingVolFile = false;

function resetVolumesLab() {
  isVolContainerActive = false;
  isVolMounted = false;
  volContainerFiles = [];
  // Keep host files on tab switch to represent persistent storage!
  renderVolumeDOM();
  volTerminalLog.innerHTML = `$ Ready to spin up container. Option 'Mount Persistent Volume' is ${chkMountVolume.checked ? 'ENABLED' : 'DISABLED'}.`;
}

function renderVolumeDOM() {
  // 1. Container card render
  if (!isVolContainerActive) {
    volContainerCard.innerHTML = `<div class="vol-card-empty">Container offline. Click Spawn above.</div>`;
    volMountWireLine.className = 'vol-mount-wire-line';
  } else {
    volMountWireLine.className = `vol-mount-wire-line ${isVolMounted ? 'wire--mounted' : ''}`;
    volContainerCard.innerHTML = `
      <div class="vol-header">
        <span class="scard-dot"></span>
        <strong>checkout-api-instance</strong>
      </div>
      <div class="vol-body">
        <p class="vol-meta">Status: running</p>
        <div class="vol-files-tree">
          <strong>Container Filesystem:</strong>
          <ul>
            <li>/app/server.js <span class="vol-tag-readonly">[ro]</span></li>
            <li>/app/package.json <span class="vol-tag-readonly">[ro]</span></li>
            ${isVolMounted ? '<li>/app/logs/ <span class="vol-tag-mount">[mounted]</span></li>' : ''}
            ${volContainerFiles.map(file => {
              const isLog = file.startsWith('logs/');
              return `<li class="${isLog ? 'vol-file-mounted' : 'vol-file-ephemeral'}">${file} ${isLog ? '<span class="vol-tag-sync">[synced]</span>' : '<span class="vol-tag-temp">[temp]</span>'}</li>`;
            }).join('')}
          </ul>
        </div>
      </div>
    `;
  }

  // 2. Host files list render
  if (volHostFiles.length === 0) {
    volHostFileList.innerHTML = `<li class="empty-vol-msg">No persistent volume files created.</li>`;
  } else {
    volHostFileList.innerHTML = volHostFiles.map(file => {
      return `<li><span class="vol-icon-sys">📄</span> ${file} <span class="vol-tag-host">[retained]</span></li>`;
    }).join('');
  }
}

btnSpawnVolumeContainer.addEventListener('click', () => {
  if (isVolContainerActive) {
    volTerminalLog.innerHTML += `\n<span class="terminal-text--miss">Error: Container instance is already running.</span>`;
    volTerminalLog.scrollTop = volTerminalLog.scrollHeight;
    return;
  }

  isVolContainerActive = true;
  isVolMounted = chkMountVolume.checked;
  
  if (isVolMounted) {
    // Mount logs: load whatever host files are stored back into container view logs/ folder!
    volContainerFiles = volHostFiles.map(file => `logs/${file}`);
    volTerminalLog.innerHTML += `\n$ docker run -d -v shared-logs:/app/logs checkout-api\n<span class="terminal-text--cached">Running checkout-api inside isolated namespace.\nMounting Volume 'shared-logs' ➔ /app/logs. Loaded ${volHostFiles.length} files from Host storage.</span>`;
  } else {
    volContainerFiles = [];
    volTerminalLog.innerHTML += `\n$ docker run -d checkout-api\n<span class="terminal-text--alert">Running checkout-api with EPHEMERAL writable layers only.\nWarning: No volumes mounted. Writable data will be lost on docker rm.</span>`;
  }

  renderVolumeDOM();
  volTerminalLog.scrollTop = volTerminalLog.scrollHeight;
});

btnWriteVolumeFile.addEventListener('click', () => {
  if (!isVolContainerActive) {
    volTerminalLog.innerHTML += `\n<span class="terminal-text--miss">Error: No active container instance to write files.</span>`;
    volTerminalLog.scrollTop = volTerminalLog.scrollHeight;
    return;
  }
  if (isWritingVolFile) return;
  isWritingVolFile = true;

  const fileId = Math.floor(Math.random() * 899 + 100);
  const fileName = `log-${fileId}.txt`;

  if (isVolMounted) {
    volTerminalLog.innerHTML += `\n$ docker exec checkout-api-instance touch /app/logs/${fileName}\n* Writing log data to volume mount...`;
    
    // Animate packet down bridge mount wire
    volMountPacket.className = 'vol-mount-packet vol-packet--animating';
    
    setTimeout(() => {
      volMountPacket.className = 'vol-mount-packet';
      volContainerFiles.push(`logs/${fileName}`);
      volHostFiles.push(fileName);
      
      volTerminalLog.innerHTML += `\n<span class="terminal-text--cached">Sync Successful: File synced with Host storage at /var/lib/docker/volumes/shared-logs/_data/${fileName}</span>`;
      renderVolumeDOM();
      volTerminalLog.scrollTop = volTerminalLog.scrollHeight;
      isWritingVolFile = false;
    }, 1200);
  } else {
    volTerminalLog.innerHTML += `\n$ docker exec checkout-api-instance touch /app/${fileName}\n* Writing to temporary writable layer...`;
    
    setTimeout(() => {
      volContainerFiles.push(fileName);
      volTerminalLog.innerHTML += `\n<span class="terminal-text--alert">Write Successful: Written to container's isolated layer. This file DOES NOT exist on Host machine.</span>`;
      renderVolumeDOM();
      volTerminalLog.scrollTop = volTerminalLog.scrollHeight;
      isWritingVolFile = false;
    }, 600);
  }
});

btnDeleteVolumeContainer.addEventListener('click', () => {
  if (!isVolContainerActive) {
    volTerminalLog.innerHTML += `\n<span class="terminal-text--miss">Error: No container running to delete.</span>`;
    volTerminalLog.scrollTop = volTerminalLog.scrollHeight;
    return;
  }

  isVolContainerActive = false;
  volTerminalLog.innerHTML += `\n$ docker rm -f checkout-api-instance\nStopping container... done.\nRemoving container instance... done.`;

  if (isVolMounted) {
    volTerminalLog.innerHTML += `\n<span class="terminal-text--cached">Clean Up Safe: Container destroyed, but volume 'shared-logs' remains intact on Host. Retained ${volHostFiles.length} files.</span>`;
  } else {
    volTerminalLog.innerHTML += `\n<span class="terminal-text--miss">Data Purged: Container writable layer destroyed. Writable files were permanently lost.</span>`;
  }

  renderVolumeDOM();
  volTerminalLog.scrollTop = volTerminalLog.scrollHeight;
});


// ==========================================
// PLAYGROUND 4: NAMESPACE ISOLATION SANDBOX
// ==========================================
const btnSpawnContainer = document.querySelector('#btnSpawnContainer');
const btnResetIsolationLab = document.querySelector('#btnResetIsolationLab');
const isolationContainersPool = document.querySelector('#isolationContainersPool');
const isolationPoolEmptyState = document.querySelector('#isolationPoolEmptyState');
const isolationTerminalLog = document.querySelector('#isolationTerminalLog');

let spawnedContainers = [];
let spawnCount = 0;

function renderIsolationContainers() {
  if (spawnedContainers.length === 0) {
    isolationPoolEmptyState.style.display = 'block';
    isolationContainersPool.querySelectorAll('.sandbox-container-card').forEach((card) => card.remove());
    return;
  }

  isolationPoolEmptyState.style.display = 'none';
  
  // Clear and rebuild cards safely
  isolationContainersPool.querySelectorAll('.sandbox-container-card').forEach((card) => card.remove());
  
  spawnedContainers.forEach((container) => {
    const card = document.createElement('div');
    card.className = 'sandbox-container-card';
    card.id = `scard-${container.id}`;
    card.innerHTML = `
      <div class="scard-header">
        <span class="scard-dot"></span>
        <strong>${container.name}</strong>
        <button class="scard-delete" type="button">×</button>
      </div>
      <div class="scard-body">
        <p class="scard-meta">IP: 172.17.0.${container.id + 1}</p>
        <div class="scard-files">
          <strong>Filesystem Files:</strong>
          <ul>
            <li>/app (read-only)</li>
            <li>/package.json (read-only)</li>
            ${container.files.map(file => `<li class="temp-file">${file} <span class="temp-tag">[writable]</span></li>`).join('')}
          </ul>
        </div>
      </div>
      <div class="scard-footer">
        <button class="scard-write-btn" type="button">+ Write Log File</button>
      </div>
    `;

    card.querySelector('.scard-delete').addEventListener('click', () => {
      deleteContainerInstance(container.id);
    });

    card.querySelector('.scard-write-btn').addEventListener('click', () => {
      writeFileToContainer(container.id);
    });

    isolationContainersPool.appendChild(card);
  });
}

function spawnContainerInstance() {
  if (spawnedContainers.length >= 3) {
    isolationTerminalLog.innerHTML += `\n<span class="terminal-text--miss">Error: Sandbox limit reached. Max 3 instances allowed.</span>`;
    isolationTerminalLog.scrollTop = isolationTerminalLog.scrollHeight;
    return;
  }

  spawnCount++;
  const newContainer = {
    id: spawnCount,
    name: `checkout-api-${spawnCount}`,
    files: []
  };

  spawnedContainers.push(newContainer);
  
  isolationTerminalLog.innerHTML += `\n$ docker run -d -p 808${spawnCount}:80 checkout-api\n<span class="terminal-text--cached">Created container: sha256:d83${spawnCount}ef98f3c7b2...</span>`;
  
  renderIsolationContainers();
  
  const card = document.querySelector(`#scard-${newContainer.id}`);
  if (card) {
    card.classList.add('pulse-glow');
    setTimeout(() => card.classList.remove('pulse-glow'), 800);
  }

  isolationTerminalLog.scrollTop = isolationTerminalLog.scrollHeight;
}

function deleteContainerInstance(id) {
  const container = spawnedContainers.find(c => c.id === id);
  if (!container) return;

  spawnedContainers = spawnedContainers.filter(c => c.id !== id);
  
  isolationTerminalLog.innerHTML += `\n$ docker rm -f ${container.name}\nRemoved instance ${container.name}.\n<span class="terminal-text--miss">Writable filesystem layer destroyed. Writable files lost.</span>`;
  
  renderIsolationContainers();
  isolationTerminalLog.scrollTop = isolationTerminalLog.scrollHeight;
}

function writeFileToContainer(id) {
  const container = spawnedContainers.find(c => c.id === id);
  if (!container) return;

  const fileNum = container.files.length + 1;
  const fileName = `/app/temp-log-${fileNum}.txt`;
  container.files.push(fileName);
  
  isolationTerminalLog.innerHTML += `\n$ docker exec ${container.name} touch ${fileName}\nCreated file inside writable sandbox filesystem container: ${fileName}\nNote: File does not exist in base image or other running containers.`;
  
  renderIsolationContainers();
  isolationTerminalLog.scrollTop = isolationTerminalLog.scrollHeight;
}

btnSpawnContainer.addEventListener('click', spawnContainerInstance);
btnResetIsolationLab.addEventListener('click', () => {
  spawnedContainers = [];
  isolationTerminalLog.innerHTML = `$ docker rm -f $(docker ps -a -q)\nCleaned up environment. Active containers terminated.`;
  renderIsolationContainers();
});


// ==========================================
// PLAYGROUND 5: DOCKER COMPOSE NETWORKING LAB
// ==========================================
const btnComposeUp = document.querySelector('#btnComposeUp');
const btnComposeRequest = document.querySelector('#btnComposeRequest');
const btnComposeDown = document.querySelector('#btnComposeDown');
const composeBrowserResponse = document.querySelector('#composeBrowserResponse');
const composeTerminalLog = document.querySelector('#composeTerminalLog');

const cservProxy = document.querySelector('#cserv-proxy');
const cservApi = document.querySelector('#cserv-api');
const cservDb = document.querySelector('#cserv-db');

const composePacketOuter = document.querySelector('#composePacketOuter');
const composePacketProxyApi = document.querySelector('#composePacketProxyApi');
const composePacketApiDb = document.querySelector('#composePacketApiDb');

let isComposeActive = false;
let isComposeProgress = false;
let isRoutingComposeRequest = false;

function resetComposeLab() {
  isComposeActive = false;
  isComposeProgress = false;
  isRoutingComposeRequest = false;

  btnComposeUp.disabled = false;
  btnComposeRequest.disabled = true;
  btnComposeDown.disabled = true;

  cservProxy.className = 'compose-service-unit service-unit--proxy';
  cservApi.className = 'compose-service-unit service-unit--api';
  cservDb.className = 'compose-service-unit service-unit--db';

  composePacketOuter.className = 'compose-packet-dot packet-dot--outer';
  composePacketProxyApi.className = 'compose-packet-dot';
  composePacketApiDb.className = 'compose-packet-dot';

  composeBrowserResponse.innerHTML = `Inactive. Deploy compose environment.`;
  composeTerminalLog.innerHTML = `$ docker compose ps`;
}

btnComposeUp.addEventListener('click', () => {
  if (isComposeActive || isComposeProgress) return;
  isComposeProgress = true;
  btnComposeUp.disabled = true;

  composeTerminalLog.innerHTML = `$ docker compose up -d\nCreating network "app-bridge" with driver "bridge"\n`;

  // Stagger service creation visually
  setTimeout(() => {
    cservProxy.classList.add('active');
    composeTerminalLog.innerHTML += `Creating container proxy (nginx) ... <span class="terminal-text--cached">done</span>\n`;
    composeTerminalLog.scrollTop = composeTerminalLog.scrollHeight;
  }, 500);

  setTimeout(() => {
    cservApi.classList.add('active');
    composeTerminalLog.innerHTML += `Creating container api-server (Node) ... <span class="terminal-text--cached">done</span>\n`;
    composeTerminalLog.scrollTop = composeTerminalLog.scrollHeight;
  }, 1000);

  setTimeout(() => {
    cservDb.classList.add('active');
    composeTerminalLog.innerHTML += `Creating container database (postgres) ... <span class="terminal-text--cached">done</span>\n`;
    composeTerminalLog.scrollTop = composeTerminalLog.scrollHeight;
  }, 1500);

  setTimeout(() => {
    isComposeActive = true;
    isComposeProgress = false;
    btnComposeRequest.disabled = false;
    btnComposeDown.disabled = false;

    composeBrowserResponse.innerHTML = `Connected to network app-bridge. Click 'Send Request' to request checkouts.`;
    composeTerminalLog.innerHTML += `\nCompose stack loaded. proxy (80➔80), api (8080), db (5432) active.`;
    composeTerminalLog.scrollTop = composeTerminalLog.scrollHeight;
  }, 2000);
});

btnComposeRequest.addEventListener('click', () => {
  if (!isComposeActive || isRoutingComposeRequest) return;
  isRoutingComposeRequest = true;

  btnComposeRequest.disabled = true;
  btnComposeDown.disabled = true;

  composeTerminalLog.innerHTML += `\n\n$ curl -v http://localhost:80\n* Routing traffic to Host Port 80...`;
  composeTerminalLog.scrollTop = composeTerminalLog.scrollHeight;
  composeBrowserResponse.innerHTML = `<span class="viewport-text--loading">Connecting host ➔ proxy...</span>`;

  // Reset animations
  composePacketOuter.className = 'compose-packet-dot packet-dot--outer';
  composePacketProxyApi.className = 'compose-packet-dot';
  composePacketApiDb.className = 'compose-packet-dot';

  // 1. Packet outer (Client ➔ Proxy)
  composePacketOuter.classList.add('packet--animating');
  setTimeout(() => {
    composePacketOuter.style.left = '100%';
  }, 50);

  // 2. Packet inside bridge (Proxy ➔ API)
  setTimeout(() => {
    cservProxy.classList.add('pulse-glow');
    setTimeout(() => cservProxy.classList.remove('pulse-glow'), 600);

    composeBrowserResponse.innerHTML = `<span class="viewport-text--loading">Proxy resolving "api:8080" via DNS...</span>`;
    composeTerminalLog.innerHTML += `\nnginx [172.20.0.2] : Proxy request to Backend server at alias "http://api:8080"`;
    composeTerminalLog.innerHTML += `\nnginx [172.20.0.2] : Resolving hostname "api" via Bridge DNS ➔ 172.20.0.3`;
    composeTerminalLog.scrollTop = composeTerminalLog.scrollHeight;

    composePacketProxyApi.classList.add('packet--animating');
    setTimeout(() => {
      composePacketProxyApi.style.left = '100%';
    }, 50);
  }, 1000);

  // 3. Packet inside bridge (API ➔ DB)
  setTimeout(() => {
    cservApi.classList.add('pulse-glow');
    setTimeout(() => cservApi.classList.remove('pulse-glow'), 600);

    composeBrowserResponse.innerHTML = `<span class="viewport-text--loading">Backend API querying "db:5432" via DNS...</span>`;
    composeTerminalLog.innerHTML += `\napi-server [172.20.0.3] : GET /checkouts received. Querying DB...`;
    composeTerminalLog.innerHTML += `\napi-server [172.20.0.3] : Resolving database alias "db" via Bridge DNS ➔ 172.20.0.4`;
    composeTerminalLog.scrollTop = composeTerminalLog.scrollHeight;

    composePacketApiDb.classList.add('packet--animating');
    setTimeout(() => {
      composePacketApiDb.style.left = '100%';
    }, 50);
  }, 2200);

  // 4. Return success
  setTimeout(() => {
    cservDb.classList.add('pulse-glow');
    setTimeout(() => cservDb.classList.remove('pulse-glow'), 600);

    composeTerminalLog.innerHTML += `\ndatabase [172.20.0.4] : SQL query complete. Returned 12 records.`;
    composeTerminalLog.innerHTML += `\napi-server [172.20.0.3] : Response mapped successfully.`;
    composeTerminalLog.innerHTML += `\nnginx [172.20.0.2] : <span class="terminal-text--cached">< HTTP/1.1 200 OK</span>`;
    composeTerminalLog.scrollTop = composeTerminalLog.scrollHeight;

    composeBrowserResponse.innerHTML = `
      <div class="viewport-response viewport-response--success">
        <strong>HTTP 200 OK</strong>
        <p>Success - 12 Checkouts Returned</p>
        <small>Client ➔ proxy (resolve bridge) ➔ backend ➔ database (resolve bridge) executed successfully!</small>
      </div>
    `;

    // Clear animations
    composePacketOuter.className = 'compose-packet-dot packet-dot--outer packet--success';
    composePacketProxyApi.className = 'compose-packet-dot packet--success';
    composePacketApiDb.className = 'compose-packet-dot packet--success';

    isRoutingComposeRequest = false;
    btnComposeRequest.disabled = false;
    btnComposeDown.disabled = false;
  }, 3400);
});

btnComposeDown.addEventListener('click', () => {
  if (!isComposeActive || isRoutingComposeRequest) return;
  resetComposeLab();
  composeTerminalLog.innerHTML = `$ docker compose down\nStopping proxy ... <span class="terminal-text--miss">done</span>\nStopping api-server ... <span class="terminal-text--miss">done</span>\nStopping database ... <span class="terminal-text--miss">done</span>\nRemoving network "app-bridge" ... <span class="terminal-text--miss">done</span>\n\nEnvironment cleaned.`;
});


// ==========================================
// PLAYGROUND 6: MULTI-STAGE BUILD OPTIMIZER
// ==========================================
const btnRunMultistageBuild = document.querySelector('#btnRunMultistageBuild');
const multistageLayerStack = document.querySelector('#multistageLayerStack');
const msMeterFill = document.querySelector('#msMeterFill');
const msMeterLabel = document.querySelector('#msMeterLabel');
const multistageTerminalLog = document.querySelector('#multistageTerminalLog');
const multistageLayersTitle = document.querySelector('#multistageLayersTitle');
const msOptimizationBadge = document.querySelector('#msOptimizationBadge');

const buildImageRecipes = {
  single: [
    { text: 'FROM node:22-alpine', size: '120MB', role: 'runtime' },
    { text: 'WORKDIR /app', size: '0MB', role: 'setup' },
    { text: 'COPY . .', size: '50MB', role: 'code' },
    { text: 'RUN npm install', size: '750MB', role: 'dev-packages' },
    { text: 'RUN npm run build', size: '120MB', role: 'compiler' },
    { text: 'CMD ["node", "dist/server.js"]', size: '0MB', role: 'cmd' }
  ],
  multi: [
    { text: 'FROM node:22-alpine as builder', size: '120MB', role: 'builder-base' },
    { text: 'WORKDIR /app', size: '0MB', role: 'builder-setup' },
    { text: 'COPY package*.json ./', size: '0MB', role: 'builder-manifest' },
    { text: 'RUN npm ci', size: '750MB', role: 'builder-packages' },
    { text: 'COPY . .', size: '50MB', role: 'builder-code' },
    { text: 'RUN npm run compile', size: '120MB', role: 'builder-compile' },
    { text: 'FROM node:22-alpine as runner', size: '120MB', role: 'runner-base' },
    { text: 'COPY --from=builder /app/dist ./dist', size: '10MB', role: 'runner-copy-code' },
    { text: 'RUN npm ci --omit=dev', size: '32MB', role: 'runner-packages' },
    { text: 'CMD ["node", "dist/server.js"]', size: '0MB', role: 'runner-cmd' }
  ]
};

function getActiveMultistageMode() {
  const selected = document.querySelector('input[name="multistageMode"]:checked');
  return selected ? selected.value : 'single';
}

function renderMultistageLayers() {
  const mode = getActiveMultistageMode();
  const layers = buildImageRecipes[mode];

  multistageLayersTitle.textContent = mode === 'single' ? 'Single-Stage Layers' : 'Multi-Stage Build Flow';
  
  multistageLayerStack.innerHTML = layers.map((layer, index) => {
    return `
      <div class="cache-layer ms-layer" id="mslayer-${index}" data-role="${layer.role}">
        <code>${layer.text}</code>
      </div>
    `;
  }).join('');

  msMeterFill.style.height = '0%';
  msMeterLabel.textContent = '0 MB';
  msOptimizationBadge.style.opacity = '0';
}

// Re-render when toggling modes
document.querySelectorAll('input[name="multistageMode"]').forEach((radio) => {
  radio.addEventListener('change', () => {
    renderMultistageLayers();
    multistageTerminalLog.innerHTML = `$ Select build method and click build.`;
  });
});

btnRunMultistageBuild.addEventListener('click', () => {
  const mode = getActiveMultistageMode();
  const layers = buildImageRecipes[mode];
  btnRunMultistageBuild.disabled = true;

  multistageTerminalLog.innerHTML = `$ docker build -t node-app:latest .\n`;
  renderMultistageLayers(); // reset display

  let index = 0;
  
  function buildNextMSLayer() {
    if (index >= layers.length) {
      if (mode === 'single') {
        msMeterFill.style.height = '100%';
        msMeterFill.style.background = 'linear-gradient(to top, var(--coral), #b72d2d)';
        msMeterLabel.textContent = '1.04 GB';
        msOptimizationBadge.style.opacity = '0.4';
        msOptimizationBadge.className = 'multistage-optimized-badge';
        msOptimizationBadge.textContent = 'Bulk Build';

        multistageTerminalLog.innerHTML += `\nSuccessfully built single-stage image node-app:latest (Size: 1.04 GB)`;
      } else {
        msMeterFill.style.height = '16%';
        msMeterFill.style.background = 'linear-gradient(to top, var(--teal), var(--cyan))';
        msMeterLabel.textContent = '162 MB';
        msOptimizationBadge.style.opacity = '1';
        msOptimizationBadge.className = 'multistage-optimized-badge ms-optimized--glow';
        msOptimizationBadge.textContent = '84% Optimized!';

        multistageTerminalLog.innerHTML += `\nSuccessfully built multi-stage image node-app:latest (Size: 162 MB)\n<span class="terminal-text--cached">Compilers & cache layers stripped from final artifact!</span>`;
      }
      
      btnRunCacheBuild.disabled = false;
      btnRunMultistageBuild.disabled = false;
      return;
    }

    const layer = layers[index];
    const domLayer = document.querySelector(`#mslayer-${index}`);
    
    // Highlight step
    domLayer.classList.add('layer--built');
    multistageTerminalLog.innerHTML += `Step ${index + 1}/${layers.length} : ${layer.text}\n`;
    multistageTerminalLog.scrollTop = multistageTerminalLog.scrollHeight;

    // Trigger visual transitions if multi-stage builder is completed
    if (mode === 'multi' && layer.role.startsWith('runner-')) {
      // Grey out builder layers
      document.querySelectorAll('.ms-layer').forEach((item) => {
        if (item.dataset.role.startsWith('builder-')) {
          item.style.opacity = '0.35';
          item.style.borderStyle = 'dashed';
        }
      });
      domLayer.classList.remove('layer--built');
      domLayer.classList.add('layer--cached'); // Light green for production stage
    }

    index++;
    setTimeout(buildNextMSLayer, 400);
  }

  setTimeout(buildNextMSLayer, 300);
});


// ==========================================
// SCROLL REVEAL SCROLL LISTENER
// ==========================================
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  },
  { threshold: 0.12 },
);

document.querySelectorAll('.reveal').forEach((item) => {
  observer.observe(item);
});

// ==========================================
// INITIAL SETUP
// ==========================================
setStep(0);
switchMode('walkthrough');
