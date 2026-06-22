(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=[{eyebrow:`Step 01`,title:`Prepare the application folder`,body:`Docker starts from a build context: the project folder sent to the Docker daemon. This usually includes source code, dependency manifests, config templates, and a Dockerfile.`,command:`server.js + package.json + Dockerfile + .dockerignore`,focus:`app`,duration:3500},{eyebrow:`Step 02`,title:`Filter files with .dockerignore`,body:`Before building, Docker removes ignored files from the build context so secrets, logs, local dependencies, and bulky folders do not get copied into the image.`,command:`.dockerignore -> node_modules, .git, .env.local, logs`,focus:`app`,duration:3500},{eyebrow:`Step 03`,title:`Read the Dockerfile recipe`,body:`The Dockerfile is a sequence of instructions. Docker reads it from top to bottom and turns each meaningful instruction into an image layer.`,command:`FROM -> WORKDIR -> COPY -> RUN -> EXPOSE -> CMD`,focus:`dockerfile`,duration:4e3},{eyebrow:`Step 04`,title:`Build cached image layers`,body:`Docker executes each instruction and stores the result as a layer. If an instruction and its inputs have not changed, Docker can reuse the cached layer.`,command:`docker build -t checkout-api:1.0 .`,focus:`image`,duration:4e3},{eyebrow:`Step 05`,title:`Tag and store the image`,body:`The built image receives a name and tag. It can stay local or be pushed to a registry so other machines can pull the exact same artifact.`,command:`docker tag checkout-api:1.0 registry/app:1.0`,focus:`image`,duration:3500},{eyebrow:`Step 06`,title:`Create the container runtime sandbox`,body:`When the image runs, Docker creates a writable container layer plus isolated namespaces for process, filesystem, networking, and environment variables.`,command:`docker run --name checkout -e NODE_ENV=prod checkout-api:1.0`,focus:`container`,duration:4500},{eyebrow:`Step 07`,title:`Connect ports, env, and volumes`,body:`A useful container needs controlled inputs and outputs: port mapping for traffic, environment variables for configuration, and volumes for persistent data.`,command:`docker run -p 8080:80 -v app-data:/data --env-file .env`,focus:`container`,duration:4500},{eyebrow:`Step 08`,title:`Scale identical containers`,body:`Because every container starts from the same image, you can run multiple copies behind a load balancer or orchestrator without rebuilding the app.`,command:`one image -> many containers -> predictable deployments`,focus:`scale`,duration:4e3}],t=[{number:`01`,title:`Build context is collected`,label:`Input folder`,summary:`Docker receives a snapshot of your project directory. This is the raw material for the image build.`,command:`docker build .`,points:[`Source code is included`,`Dependency manifests are included`,`Dockerfile gives build instructions`],visual:`context`},{number:`02`,title:`.dockerignore removes noise`,label:`Context filter`,summary:`Files that should not be sent to Docker are filtered out before the build starts.`,command:`node_modules
.git
.env.local`,points:[`Smaller builds`,`Fewer accidental secrets`,`Cleaner image contents`],visual:`ignore`},{number:`03`,title:`Base image is pulled`,label:`FROM`,summary:`Docker starts from an existing image such as Node, Python, Nginx, Ubuntu, or Alpine.`,command:`FROM node:22-alpine`,points:[`Provides operating-system files`,`Provides language runtime`,`Becomes the first image layer`],visual:`base`},{number:`04`,title:`App files are copied in`,label:`COPY`,summary:`Docker copies selected files from the build context into the image filesystem.`,command:`WORKDIR /app
COPY package*.json ./
COPY src ./src`,points:[`Creates repeatable file layout`,`Separates dependency files from app files`,`Improves layer caching`],visual:`copy`},{number:`05`,title:`Dependencies are installed`,label:`RUN`,summary:`Build commands run inside the temporary build environment and their output becomes another image layer.`,command:`RUN npm ci --omit=dev`,points:[`Installs exact dependency versions`,`Stores output in the image`,`Reuses cache if package files do not change`],visual:`run`},{number:`06`,title:`Startup command is recorded`,label:`CMD`,summary:`The image stores metadata describing the default command, exposed port, working directory, and environment defaults.`,command:`EXPOSE 80
CMD ["node", "server.js"]`,points:[`Image is still not running`,`Metadata tells containers how to start`,`Command can be overridden at run time`],visual:`cmd`},{number:`07`,title:`Image becomes immutable blueprint`,label:`Image artifact`,summary:`The final image is a stack of read-only layers plus metadata. It can be tagged, shared, scanned, and pulled elsewhere.`,command:`checkout-api:1.0 -> sha256:9f2...`,points:[`Read-only layers`,`Content-addressed ID`,`Same artifact runs everywhere`],visual:`artifact`},{number:`08`,title:`Container gets writable layer`,label:`Runtime layer`,summary:`Running an image adds a thin writable layer on top. Changes inside the container go there, not into the original image.`,command:`docker run checkout-api:1.0`,points:[`Image stays unchanged`,`Container can write temporary files`,`Removing container removes that writable layer`],visual:`writable`},{number:`09`,title:`Isolation is created`,label:`Namespaces`,summary:`Docker uses kernel features to isolate process IDs, filesystem mounts, network interfaces, users, and resource limits.`,command:`PID namespace + mount namespace + network namespace`,points:[`Own process view`,`Own filesystem view`,`Own network identity`],visual:`isolation`},{number:`10`,title:`Traffic enters through port mapping`,label:`Networking`,summary:`The app listens inside the container. Port mapping connects a host port to the container port.`,command:`-p 8080:80  means  host:8080 -> container:80`,points:[`Host receives browser request`,`Docker forwards to container`,`App response comes back out`],visual:`ports`},{number:`11`,title:`Config and data are attached`,label:`Env + volumes`,summary:`Environment variables configure behavior. Volumes keep important data outside the disposable container layer.`,command:`--env-file .env -v app-data:/data`,points:[`Config changes without rebuild`,`Data survives container replacement`,`Secrets should be injected safely`],visual:`volumes`},{number:`12`,title:`Same image scales into many containers`,label:`Replication`,summary:`Scaling creates more containers from the same image, often behind a load balancer or orchestrator.`,command:`docker compose up --scale api=3`,points:[`Identical runtime package`,`Independent container instances`,`Easy rollback by using an older image tag`],visual:`replicas`}],n=[`server.js`,`package.json`,`.env`,`routes/`,`views/`],r=[`node:22-alpine`,`npm packages`,`app source`,`env defaults`,`CMD node server`],i={context:`<div class="mini-files"><i>src/</i><i>package.json</i><i>Dockerfile</i><i>README.md</i></div>`,ignore:`<div class="mini-filter"><i>src/</i><i class="blocked">node_modules</i><i>Dockerfile</i><i class="blocked">.git</i></div>`,base:`<div class="mini-stack"><i>alpine fs</i><i>node runtime</i><i>security patches</i></div>`,copy:`<div class="mini-copy"><i>host files</i><b></b><i>/app</i></div>`,run:`<div class="mini-terminal"><i>$ npm ci</i><i>fetch packages</i><i>write node_modules</i></div>`,cmd:`<div class="mini-metadata"><i>EXPOSE 80</i><i>WORKDIR /app</i><i>CMD node server.js</i></div>`,artifact:`<div class="mini-image"><i>layer 5</i><i>layer 4</i><i>layer 3</i><i>layer 2</i><i>layer 1</i><b>sha256</b></div>`,writable:`<div class="mini-writable"><i>read-only image</i><strong>writable container layer</strong></div>`,isolation:`<div class="mini-isolation"><i>PID</i><i>FS</i><i>NET</i><i>CPU</i></div>`,ports:`<div class="mini-ports"><i>host :8080</i><b></b><i>container :80</i></div>`,volumes:`<div class="mini-volumes"><i>.env</i><i>volume</i><b>container</b></div>`,replicas:`<div class="mini-replicas"><i>api-1</i><i>api-2</i><i>api-3</i><b>load balancer</b></div>`},a=document.querySelector(`#app`);a.innerHTML=`
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
              ${n.map((e,t)=>`<span style="--i:${t}">${e}</span>`).join(``)}
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
              ${r.map((e,t)=>`<span style="--layer:${t}">${e}</span>`).join(``)}
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
        <p class="step-panel__eyebrow" id="stepEyebrow">${e[0].eyebrow}</p>
        <h2 id="stepTitle">${e[0].title}</h2>
        <p id="stepBody">${e[0].body}</p>
        <code id="stepCommand">${e[0].command}</code>
        <div class="hero__actions" aria-label="Walkthrough controls" style="margin-top: 28px;">
          <button class="primary-action" id="playFlow" type="button">Play walkthrough</button>
          <button class="secondary-action" id="resetFlow" type="button">Reset</button>
        </div>
        <div class="progress-bar-container" style="margin-top: 18px;">
          <div id="progressBarFill" class="progress-bar-fill"></div>
        </div>
      </div>

      <div class="timeline" role="tablist" aria-label="Docker workflow steps">
        ${e.map((e,t)=>`
              <button class="timeline__step ${t===0?`is-active`:``}" type="button" data-step="${t}" role="tab" aria-selected="${t===0}">
                <span>${String(t+1).padStart(2,`0`)}</span>
                ${e.title}
              </button>
            `).join(``)}
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
        ${t.map(e=>`
              <article class="detail-card detail-card--${e.visual}" id="card-${e.visual}">
                <div class="detail-card__visual" aria-hidden="true">
                  ${i[e.visual]}
                </div>
                <div class="detail-card__copy">
                  <span class="detail-number">${e.number}</span>
                  <p class="detail-label">${e.label}</p>
                  <h3>${e.title}</h3>
                  <p>${e.summary}</p>
                  <code>${e.command}</code>
                  <ul>
                    ${e.points.map(e=>`<li>${e}</li>`).join(``)}
                  </ul>
                </div>
              </article>
            `).join(``)}
      </div>
    </section>
  </main>
`;var o=0,s=null,ee=null,c=0,l=!1,u=!1,te=`walkthrough`,ne=`cache`,re=document.documentElement,ie=document.querySelector(`#visualStage`),ae=document.querySelector(`#panelWalkthrough`),oe=document.querySelector(`#panelLab`),se=document.querySelector(`#walkthroughTimeline`),ce=document.querySelector(`#stepEyebrow`),le=document.querySelector(`#stepTitle`),ue=document.querySelector(`#stepBody`),de=document.querySelector(`#stepCommand`),fe=[...document.querySelectorAll(`.timeline__step`)],d=document.querySelector(`#playFlow`),pe=document.querySelector(`#resetFlow`),f=document.querySelector(`#progressBarFill`),p=document.querySelector(`#btnModeWalkthrough`),m=document.querySelector(`#btnModeLab`);function h(t){o=t;let n=e[t];re.dataset.focus=n.focus,re.dataset.step=String(t+1),ce.textContent=n.eyebrow,le.textContent=n.title,ue.textContent=n.body,de.textContent=n.command,document.querySelectorAll(`[data-focus]`).forEach(e=>{let t=e.dataset.focus.split(` `);e.classList.toggle(`is-focused`,t.includes(n.focus))}),fe.forEach((e,n)=>{let r=n===t;e.classList.toggle(`is-active`,r),e.setAttribute(`aria-selected`,String(r))}),document.activeElement&&document.activeElement.classList.contains(`timeline__step`)&&fe[t].focus(),document.querySelectorAll(`.detail-card`).forEach(e=>{e.classList.remove(`card-highlight`)});let r=document.querySelector(`#card-${n.focus}`);r&&r.classList.add(`card-highlight`),(!l||u)&&(f.style.transition=`none`,f.style.width=`0%`)}function me(t){clearTimeout(s),ee=Date.now(),c=t,f.style.transition=`none`,f.style.width=`0%`,f.offsetHeight,f.style.transition=`width ${t}ms linear`,f.style.width=`100%`,s=setTimeout(()=>{let t=o+1;if(t>=e.length){l=!1,u=!1,d.textContent=`Replay walkthrough`,f.style.transition=`none`,f.style.width=`100%`;return}h(t),me(e[t].duration)},t)}function he(){clearTimeout(s),u=!0,d.textContent=`Resume`;let t=Date.now()-ee;c=Math.max(0,c-t);let n=(e[o].duration-c)/e[o].duration*100;f.style.transition=`none`,f.style.width=`${n}%`}function ge(){u=!1,d.textContent=`Pause`,f.offsetHeight,f.style.transition=`width ${c}ms linear`,f.style.width=`100%`,ee=Date.now(),s=setTimeout(()=>{let t=o+1;if(t>=e.length){l=!1,u=!1,d.textContent=`Replay walkthrough`,f.style.width=`100%`;return}h(t),me(e[t].duration)},c)}function _e(){if(l){u?ge():he();return}o>=e.length-1&&h(0),l=!0,u=!1,d.textContent=`Pause`,me(e[o].duration)}function g(){clearTimeout(s),l=!1,u=!1,d.textContent=`Play walkthrough`,f.style.transition=`none`,f.style.width=`0%`}d.addEventListener(`click`,_e),pe.addEventListener(`click`,()=>{g(),h(0)}),fe.forEach(t=>{t.addEventListener(`click`,()=>{g(),h(Number(t.dataset.step))}),t.addEventListener(`keydown`,n=>{let r=Number(t.dataset.step);n.key===`ArrowRight`||n.key===`ArrowDown`?(n.preventDefault(),r=(r+1)%e.length,g(),h(r)):(n.key===`ArrowLeft`||n.key===`ArrowUp`)&&(n.preventDefault(),r=(r-1+e.length)%e.length,g(),h(r))})});var ve={context:0,ignore:1,base:2,copy:3,run:4,cmd:5,artifact:4,writable:5,isolation:5,ports:6,volumes:6,replicas:7};document.querySelectorAll(`.detail-card`).forEach(e=>{e.style.cursor=`pointer`,e.addEventListener(`click`,()=>{let t=[...e.classList].find(e=>e.startsWith(`detail-card--`));if(t){let e=ve[t.replace(`detail-card--`,``)];e!==void 0&&(te!==`walkthrough`&&_(`walkthrough`),g(),h(e),document.querySelector(`.hero`).scrollIntoView({behavior:`smooth`}))}})});function _(e){te=e,e===`walkthrough`?(p.classList.add(`active`),p.setAttribute(`aria-selected`,`true`),m.classList.remove(`active`),m.setAttribute(`aria-selected`,`false`),ae.style.display=`block`,oe.style.display=`none`,se.style.display=`grid`,ie.className=`visual-stage stage--walkthrough`,h(o)):(p.classList.remove(`active`),p.setAttribute(`aria-selected`,`false`),m.classList.add(`active`),m.setAttribute(`aria-selected`,`true`),ae.style.display=`none`,oe.style.display=`block`,se.style.display=`none`,g(),xe(ne))}p.addEventListener(`click`,()=>_(`walkthrough`)),m.addEventListener(`click`,()=>_(`lab`));var ye=[...document.querySelectorAll(`.lab-select-btn`)],be={cache:document.querySelector(`#config-cache`),port:document.querySelector(`#config-port`),volumes:document.querySelector(`#config-volumes`),isolation:document.querySelector(`#config-isolation`),compose:document.querySelector(`#config-compose`),multistage:document.querySelector(`#config-multistage`)};function xe(e){ne=e,ye.forEach(t=>{let n=t.dataset.lab===e;t.classList.toggle(`active`,n),t.setAttribute(`aria-selected`,String(n))}),Object.keys(be).forEach(t=>{be[t].style.display=t===e?`block`:`none`}),ie.className=`visual-stage stage--lab-${e}`,e===`cache`?De():e===`port`?Me():e===`volumes`?Ue():e===`isolation`?L():e===`compose`?Qe():e===`multistage`&&at()}ye.forEach(e=>{e.addEventListener(`click`,()=>xe(e.dataset.lab))});var Se=document.querySelector(`#btnRunCacheBuild`),v=document.querySelector(`#btnEditCode`),y=document.querySelector(`#cacheTerminalLog`),Ce=document.querySelector(`#cacheLayerStack`),we=!1,b=!1,Te={unoptimized:[{text:`FROM node:22-alpine`,action:`FROM node:22-alpine`,cacheKey:`base`},{text:`WORKDIR /app`,action:`WORKDIR /app`,cacheKey:`base`},{text:`COPY . .`,action:`COPY . .`,cacheKey:`code`},{text:`RUN npm ci`,action:`RUN npm ci`,cacheKey:`packages`},{text:`CMD ["node", "server.js"]`,action:`CMD node server`,cacheKey:`cmd`}],optimized:[{text:`FROM node:22-alpine`,action:`FROM node:22-alpine`,cacheKey:`base`},{text:`WORKDIR /app`,action:`WORKDIR /app`,cacheKey:`base`},{text:`COPY package*.json ./`,action:`COPY package*.json ./`,cacheKey:`manifest`},{text:`RUN npm ci`,action:`RUN npm ci`,cacheKey:`packages`},{text:`COPY . .`,action:`COPY . .`,cacheKey:`code`},{text:`CMD ["node", "server.js"]`,action:`CMD node server`,cacheKey:`cmd`}]};function Ee(){let e=document.querySelector(`input[name="cacheRecipe"]:checked`);return e?e.value:`unoptimized`}function De(){Ce.innerHTML=Te[Ee()].map((e,t)=>`<div class="cache-layer" id="clayer-${t}"><code>${e.text}</code></div>`).join(``)}document.querySelectorAll(`input[name="cacheRecipe"]`).forEach(e=>{e.addEventListener(`change`,()=>{b||(De(),y.innerHTML=`$ Ready to build container image.`)})}),v.addEventListener(`click`,()=>{b||(we=!0,y.innerHTML=`<span class="terminal-text--alert">> [Source Code modified] Edited server.js. Saved local file.</span>
$ Ready to run build.`,v.classList.add(`pulse-glow`),setTimeout(()=>v.classList.remove(`pulse-glow`),1e3))});function Oe(){if(b)return;b=!0,Se.disabled=!0,v.disabled=!0;let e=Te[Ee()];y.innerHTML=`$ docker build -t checkout-api:latest .
Sending build context to Docker daemon... 2.4MB
`,De();let t=0,n=!1;function r(){if(t>=e.length){y.innerHTML+=`
Successfully tagged checkout-api:latest
Successfully built image.`,b=!1,Se.disabled=!1,v.disabled=!1,we=!1;return}let i=e[t],a=document.querySelector(`#clayer-${t}`),o=!1;we?(i.cacheKey===`code`&&(n=!0),o=!n):o=!0;let s=t+1;if(o)a.classList.add(`layer--cached`),y.innerHTML+=`\nStep ${s}/${e.length} : ${i.action}\n ---> <span class="terminal-text--cached">Using cache</span>`,setTimeout(r,300);else{a.classList.add(`layer--built`),y.innerHTML+=`\nStep ${s}/${e.length} : ${i.action}\n ---> <span class="terminal-text--miss">Cache Miss (Rebuilding...)</span>`;let t=i.cacheKey===`packages`?1600:600;i.cacheKey===`packages`&&(y.innerHTML+=`
<span class="terminal-text--sub">  npm ci: fetching dependencies from npm registry...</span>`),setTimeout(r,t)}y.scrollTop=y.scrollHeight,t++}setTimeout(r,600)}Se.addEventListener(`click`,Oe);var x=document.querySelector(`#btnSendPortRequest`),ke=document.querySelector(`#btnResetPortLab`),S=document.querySelector(`#inputHostPort`),C=document.querySelector(`#inputContainerPort`),Ae=document.querySelector(`#lblHostPort`),je=document.querySelector(`#lblContainerPort`),w=document.querySelector(`#browserFrameViewport`),T=document.querySelector(`#portConsoleLog`),E=document.querySelector(`#networkPacketDot`),D=!1;function Me(){D=!1,x.disabled=!1,E.className=`network-packet-dot`,E.style.left=`0%`,Ae.textContent=S.value,je.textContent=C.value,w.innerHTML=`Ready to ping container. Click Send Request.`,T.innerHTML=`Configure ports and hit "Send HTTP Request".
Container process is listening on Port 80.`}function Ne(){if(D)return;D=!0,x.disabled=!0;let e=Number(S.value),t=Number(C.value);Ae.textContent=e,je.textContent=t,T.innerHTML=`Running command:\n<span class="cmd-text">$ curl -v http://localhost:${e}</span>\n* Reconstructing request packet...`,w.innerHTML=`<span class="viewport-text--loading">Connecting...</span>`,E.classList.add(`packet--animating`);let n=t===80;setTimeout(()=>{n?(E.style.left=`100%`,setTimeout(()=>{E.className=`network-packet-dot packet--success`,T.innerHTML+=`\n* Connected to host port ${e}\n* Forwarded via Docker Bridge ➔ container:80\n<span class="terminal-text--cached">< HTTP/1.1 200 OK</span>\nResponse: {"status":"active","process":"Node22"}`,w.innerHTML=`
          <div class="viewport-response viewport-response--success">
            <strong>HTTP 200 OK</strong>
            <p>Connection Established!</p>
            <small>checkout-api responded successfully from inside isolated container.</small>
          </div>
        `,D=!1,x.disabled=!1},1e3)):(E.style.left=`50%`,setTimeout(()=>{E.className=`network-packet-dot packet--fail`,T.innerHTML+=`\n* Connected to host port ${e}\n* Forwarding to container:${t}\n<span class="terminal-text--miss">! Connection Refused (Port ${t} not listening)</span>\nError: No service is bound to container port ${t}.`,w.innerHTML=`
          <div class="viewport-response viewport-response--fail">
            <strong>ERR_CONNECTION_REFUSED</strong>
            <p>Could not connect to server.</p>
            <small>Traffic forwarded to container port ${t}, but checkout-api listens on port 80.</small>
          </div>
        `,D=!1,x.disabled=!1},800))},1e3)}x.addEventListener(`click`,Ne),ke.addEventListener(`click`,Me),S.addEventListener(`input`,()=>{Ae.textContent=S.value}),C.addEventListener(`input`,()=>{je.textContent=C.value});var Pe=document.querySelector(`#btnSpawnVolumeContainer`),Fe=document.querySelector(`#btnWriteVolumeFile`),Ie=document.querySelector(`#btnDeleteVolumeContainer`),Le=document.querySelector(`#chkMountVolume`),Re=document.querySelector(`#volContainerCard`),ze=document.querySelector(`#volHostFileList`),O=document.querySelector(`#volTerminalLog`),Be=document.querySelector(`#volMountPacket`),Ve=document.querySelector(`#volMountWireLine`),k=!1,A=!1,j=[],M=[],He=!1;function Ue(){k=!1,A=!1,j=[],N(),O.innerHTML=`$ Ready to spin up container. Option 'Mount Persistent Volume' is ${Le.checked?`ENABLED`:`DISABLED`}.`}function N(){k?(Ve.className=`vol-mount-wire-line ${A?`wire--mounted`:``}`,Re.innerHTML=`
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
            ${A?`<li>/app/logs/ <span class="vol-tag-mount">[mounted]</span></li>`:``}
            ${j.map(e=>{let t=e.startsWith(`logs/`);return`<li class="${t?`vol-file-mounted`:`vol-file-ephemeral`}">${e} ${t?`<span class="vol-tag-sync">[synced]</span>`:`<span class="vol-tag-temp">[temp]</span>`}</li>`}).join(``)}
          </ul>
        </div>
      </div>
    `):(Re.innerHTML=`<div class="vol-card-empty">Container offline. Click Spawn above.</div>`,Ve.className=`vol-mount-wire-line`),M.length===0?ze.innerHTML=`<li class="empty-vol-msg">No persistent volume files created.</li>`:ze.innerHTML=M.map(e=>`<li><span class="vol-icon-sys">📄</span> ${e} <span class="vol-tag-host">[retained]</span></li>`).join(``)}Pe.addEventListener(`click`,()=>{if(k){O.innerHTML+=`
<span class="terminal-text--miss">Error: Container instance is already running.</span>`,O.scrollTop=O.scrollHeight;return}k=!0,A=Le.checked,A?(j=M.map(e=>`logs/${e}`),O.innerHTML+=`\n$ docker run -d -v shared-logs:/app/logs checkout-api\n<span class="terminal-text--cached">Running checkout-api inside isolated namespace.\nMounting Volume 'shared-logs' ➔ /app/logs. Loaded ${M.length} files from Host storage.</span>`):(j=[],O.innerHTML+=`
$ docker run -d checkout-api
<span class="terminal-text--alert">Running checkout-api with EPHEMERAL writable layers only.
Warning: No volumes mounted. Writable data will be lost on docker rm.</span>`),N(),O.scrollTop=O.scrollHeight}),Fe.addEventListener(`click`,()=>{if(!k){O.innerHTML+=`
<span class="terminal-text--miss">Error: No active container instance to write files.</span>`,O.scrollTop=O.scrollHeight;return}if(He)return;He=!0;let e=`log-${Math.floor(Math.random()*899+100)}.txt`;A?(O.innerHTML+=`\n$ docker exec checkout-api-instance touch /app/logs/${e}\n* Writing log data to volume mount...`,Be.className=`vol-mount-packet vol-packet--animating`,setTimeout(()=>{Be.className=`vol-mount-packet`,j.push(`logs/${e}`),M.push(e),O.innerHTML+=`\n<span class="terminal-text--cached">Sync Successful: File synced with Host storage at /var/lib/docker/volumes/shared-logs/_data/${e}</span>`,N(),O.scrollTop=O.scrollHeight,He=!1},1200)):(O.innerHTML+=`\n$ docker exec checkout-api-instance touch /app/${e}\n* Writing to temporary writable layer...`,setTimeout(()=>{j.push(e),O.innerHTML+=`
<span class="terminal-text--alert">Write Successful: Written to container's isolated layer. This file DOES NOT exist on Host machine.</span>`,N(),O.scrollTop=O.scrollHeight,He=!1},600))}),Ie.addEventListener(`click`,()=>{if(!k){O.innerHTML+=`
<span class="terminal-text--miss">Error: No container running to delete.</span>`,O.scrollTop=O.scrollHeight;return}k=!1,O.innerHTML+=`
$ docker rm -f checkout-api-instance
Stopping container... done.
Removing container instance... done.`,A?O.innerHTML+=`\n<span class="terminal-text--cached">Clean Up Safe: Container destroyed, but volume 'shared-logs' remains intact on Host. Retained ${M.length} files.</span>`:O.innerHTML+=`
<span class="terminal-text--miss">Data Purged: Container writable layer destroyed. Writable files were permanently lost.</span>`,N(),O.scrollTop=O.scrollHeight});var We=document.querySelector(`#btnSpawnContainer`),Ge=document.querySelector(`#btnResetIsolationLab`),Ke=document.querySelector(`#isolationContainersPool`),qe=document.querySelector(`#isolationPoolEmptyState`),P=document.querySelector(`#isolationTerminalLog`),F=[],I=0;function L(){if(F.length===0){qe.style.display=`block`,Ke.querySelectorAll(`.sandbox-container-card`).forEach(e=>e.remove());return}qe.style.display=`none`,Ke.querySelectorAll(`.sandbox-container-card`).forEach(e=>e.remove()),F.forEach(e=>{let t=document.createElement(`div`);t.className=`sandbox-container-card`,t.id=`scard-${e.id}`,t.innerHTML=`
      <div class="scard-header">
        <span class="scard-dot"></span>
        <strong>${e.name}</strong>
        <button class="scard-delete" type="button">×</button>
      </div>
      <div class="scard-body">
        <p class="scard-meta">IP: 172.17.0.${e.id+1}</p>
        <div class="scard-files">
          <strong>Filesystem Files:</strong>
          <ul>
            <li>/app (read-only)</li>
            <li>/package.json (read-only)</li>
            ${e.files.map(e=>`<li class="temp-file">${e} <span class="temp-tag">[writable]</span></li>`).join(``)}
          </ul>
        </div>
      </div>
      <div class="scard-footer">
        <button class="scard-write-btn" type="button">+ Write Log File</button>
      </div>
    `,t.querySelector(`.scard-delete`).addEventListener(`click`,()=>{Ye(e.id)}),t.querySelector(`.scard-write-btn`).addEventListener(`click`,()=>{Xe(e.id)}),Ke.appendChild(t)})}function Je(){if(F.length>=3){P.innerHTML+=`
<span class="terminal-text--miss">Error: Sandbox limit reached. Max 3 instances allowed.</span>`,P.scrollTop=P.scrollHeight;return}I++;let e={id:I,name:`checkout-api-${I}`,files:[]};F.push(e),P.innerHTML+=`\n$ docker run -d -p 808${I}:80 checkout-api\n<span class="terminal-text--cached">Created container: sha256:d83${I}ef98f3c7b2...</span>`,L();let t=document.querySelector(`#scard-${e.id}`);t&&(t.classList.add(`pulse-glow`),setTimeout(()=>t.classList.remove(`pulse-glow`),800)),P.scrollTop=P.scrollHeight}function Ye(e){let t=F.find(t=>t.id===e);t&&(F=F.filter(t=>t.id!==e),P.innerHTML+=`\n$ docker rm -f ${t.name}\nRemoved instance ${t.name}.\n<span class="terminal-text--miss">Writable filesystem layer destroyed. Writable files lost.</span>`,L(),P.scrollTop=P.scrollHeight)}function Xe(e){let t=F.find(t=>t.id===e);if(!t)return;let n=`/app/temp-log-${t.files.length+1}.txt`;t.files.push(n),P.innerHTML+=`\n$ docker exec ${t.name} touch ${n}\nCreated file inside writable sandbox filesystem container: ${n}\nNote: File does not exist in base image or other running containers.`,L(),P.scrollTop=P.scrollHeight}We.addEventListener(`click`,Je),Ge.addEventListener(`click`,()=>{F=[],P.innerHTML=`$ docker rm -f $(docker ps -a -q)
Cleaned up environment. Active containers terminated.`,L()});var Ze=document.querySelector(`#btnComposeUp`),R=document.querySelector(`#btnComposeRequest`),z=document.querySelector(`#btnComposeDown`),B=document.querySelector(`#composeBrowserResponse`),V=document.querySelector(`#composeTerminalLog`),H=document.querySelector(`#cserv-proxy`),U=document.querySelector(`#cserv-api`),W=document.querySelector(`#cserv-db`),G=document.querySelector(`#composePacketOuter`),K=document.querySelector(`#composePacketProxyApi`),q=document.querySelector(`#composePacketApiDb`),J=!1,Y=!1,X=!1;function Qe(){J=!1,Y=!1,X=!1,Ze.disabled=!1,R.disabled=!0,z.disabled=!0,H.className=`compose-service-unit service-unit--proxy`,U.className=`compose-service-unit service-unit--api`,W.className=`compose-service-unit service-unit--db`,G.className=`compose-packet-dot packet-dot--outer`,K.className=`compose-packet-dot`,q.className=`compose-packet-dot`,B.innerHTML=`Inactive. Deploy compose environment.`,V.innerHTML=`$ docker compose ps`}Ze.addEventListener(`click`,()=>{J||Y||(Y=!0,Ze.disabled=!0,V.innerHTML=`$ docker compose up -d
Creating network "app-bridge" with driver "bridge"
`,setTimeout(()=>{H.classList.add(`active`),V.innerHTML+=`Creating container proxy (nginx) ... <span class="terminal-text--cached">done</span>
`,V.scrollTop=V.scrollHeight},500),setTimeout(()=>{U.classList.add(`active`),V.innerHTML+=`Creating container api-server (Node) ... <span class="terminal-text--cached">done</span>
`,V.scrollTop=V.scrollHeight},1e3),setTimeout(()=>{W.classList.add(`active`),V.innerHTML+=`Creating container database (postgres) ... <span class="terminal-text--cached">done</span>
`,V.scrollTop=V.scrollHeight},1500),setTimeout(()=>{J=!0,Y=!1,R.disabled=!1,z.disabled=!1,B.innerHTML=`Connected to network app-bridge. Click 'Send Request' to request checkouts.`,V.innerHTML+=`
Compose stack loaded. proxy (80➔80), api (8080), db (5432) active.`,V.scrollTop=V.scrollHeight},2e3))}),R.addEventListener(`click`,()=>{!J||X||(X=!0,R.disabled=!0,z.disabled=!0,V.innerHTML+=`

$ curl -v http://localhost:80
* Routing traffic to Host Port 80...`,V.scrollTop=V.scrollHeight,B.innerHTML=`<span class="viewport-text--loading">Connecting host ➔ proxy...</span>`,G.className=`compose-packet-dot packet-dot--outer`,K.className=`compose-packet-dot`,q.className=`compose-packet-dot`,G.classList.add(`packet--animating`),setTimeout(()=>{G.style.left=`100%`},50),setTimeout(()=>{H.classList.add(`pulse-glow`),setTimeout(()=>H.classList.remove(`pulse-glow`),600),B.innerHTML=`<span class="viewport-text--loading">Proxy resolving "api:8080" via DNS...</span>`,V.innerHTML+=`
nginx [172.20.0.2] : Proxy request to Backend server at alias "http://api:8080"`,V.innerHTML+=`
nginx [172.20.0.2] : Resolving hostname "api" via Bridge DNS ➔ 172.20.0.3`,V.scrollTop=V.scrollHeight,K.classList.add(`packet--animating`),setTimeout(()=>{K.style.left=`100%`},50)},1e3),setTimeout(()=>{U.classList.add(`pulse-glow`),setTimeout(()=>U.classList.remove(`pulse-glow`),600),B.innerHTML=`<span class="viewport-text--loading">Backend API querying "db:5432" via DNS...</span>`,V.innerHTML+=`
api-server [172.20.0.3] : GET /checkouts received. Querying DB...`,V.innerHTML+=`
api-server [172.20.0.3] : Resolving database alias "db" via Bridge DNS ➔ 172.20.0.4`,V.scrollTop=V.scrollHeight,q.classList.add(`packet--animating`),setTimeout(()=>{q.style.left=`100%`},50)},2200),setTimeout(()=>{W.classList.add(`pulse-glow`),setTimeout(()=>W.classList.remove(`pulse-glow`),600),V.innerHTML+=`
database [172.20.0.4] : SQL query complete. Returned 12 records.`,V.innerHTML+=`
api-server [172.20.0.3] : Response mapped successfully.`,V.innerHTML+=`
nginx [172.20.0.2] : <span class="terminal-text--cached">< HTTP/1.1 200 OK</span>`,V.scrollTop=V.scrollHeight,B.innerHTML=`
      <div class="viewport-response viewport-response--success">
        <strong>HTTP 200 OK</strong>
        <p>Success - 12 Checkouts Returned</p>
        <small>Client ➔ proxy (resolve bridge) ➔ backend ➔ database (resolve bridge) executed successfully!</small>
      </div>
    `,G.className=`compose-packet-dot packet-dot--outer packet--success`,K.className=`compose-packet-dot packet--success`,q.className=`compose-packet-dot packet--success`,X=!1,R.disabled=!1,z.disabled=!1},3400))}),z.addEventListener(`click`,()=>{!J||X||(Qe(),V.innerHTML=`$ docker compose down
Stopping proxy ... <span class="terminal-text--miss">done</span>
Stopping api-server ... <span class="terminal-text--miss">done</span>
Stopping database ... <span class="terminal-text--miss">done</span>
Removing network "app-bridge" ... <span class="terminal-text--miss">done</span>

Environment cleaned.`)});var $e=document.querySelector(`#btnRunMultistageBuild`),et=document.querySelector(`#multistageLayerStack`),Z=document.querySelector(`#msMeterFill`),tt=document.querySelector(`#msMeterLabel`),Q=document.querySelector(`#multistageTerminalLog`),nt=document.querySelector(`#multistageLayersTitle`),$=document.querySelector(`#msOptimizationBadge`),rt={single:[{text:`FROM node:22-alpine`,size:`120MB`,role:`runtime`},{text:`WORKDIR /app`,size:`0MB`,role:`setup`},{text:`COPY . .`,size:`50MB`,role:`code`},{text:`RUN npm install`,size:`750MB`,role:`dev-packages`},{text:`RUN npm run build`,size:`120MB`,role:`compiler`},{text:`CMD ["node", "dist/server.js"]`,size:`0MB`,role:`cmd`}],multi:[{text:`FROM node:22-alpine as builder`,size:`120MB`,role:`builder-base`},{text:`WORKDIR /app`,size:`0MB`,role:`builder-setup`},{text:`COPY package*.json ./`,size:`0MB`,role:`builder-manifest`},{text:`RUN npm ci`,size:`750MB`,role:`builder-packages`},{text:`COPY . .`,size:`50MB`,role:`builder-code`},{text:`RUN npm run compile`,size:`120MB`,role:`builder-compile`},{text:`FROM node:22-alpine as runner`,size:`120MB`,role:`runner-base`},{text:`COPY --from=builder /app/dist ./dist`,size:`10MB`,role:`runner-copy-code`},{text:`RUN npm ci --omit=dev`,size:`32MB`,role:`runner-packages`},{text:`CMD ["node", "dist/server.js"]`,size:`0MB`,role:`runner-cmd`}]};function it(){let e=document.querySelector(`input[name="multistageMode"]:checked`);return e?e.value:`single`}function at(){let e=it(),t=rt[e];nt.textContent=e===`single`?`Single-Stage Layers`:`Multi-Stage Build Flow`,et.innerHTML=t.map((e,t)=>`
      <div class="cache-layer ms-layer" id="mslayer-${t}" data-role="${e.role}">
        <code>${e.text}</code>
      </div>
    `).join(``),Z.style.height=`0%`,tt.textContent=`0 MB`,$.style.opacity=`0`}document.querySelectorAll(`input[name="multistageMode"]`).forEach(e=>{e.addEventListener(`change`,()=>{at(),Q.innerHTML=`$ Select build method and click build.`})}),$e.addEventListener(`click`,()=>{let e=it(),t=rt[e];$e.disabled=!0,Q.innerHTML=`$ docker build -t node-app:latest .
`,at();let n=0;function r(){if(n>=t.length){e===`single`?(Z.style.height=`100%`,Z.style.background=`linear-gradient(to top, var(--coral), #b72d2d)`,tt.textContent=`1.04 GB`,$.style.opacity=`0.4`,$.className=`multistage-optimized-badge`,$.textContent=`Bulk Build`,Q.innerHTML+=`
Successfully built single-stage image node-app:latest (Size: 1.04 GB)`):(Z.style.height=`16%`,Z.style.background=`linear-gradient(to top, var(--teal), var(--cyan))`,tt.textContent=`162 MB`,$.style.opacity=`1`,$.className=`multistage-optimized-badge ms-optimized--glow`,$.textContent=`84% Optimized!`,Q.innerHTML+=`
Successfully built multi-stage image node-app:latest (Size: 162 MB)
<span class="terminal-text--cached">Compilers & cache layers stripped from final artifact!</span>`),Se.disabled=!1,$e.disabled=!1;return}let i=t[n],a=document.querySelector(`#mslayer-${n}`);a.classList.add(`layer--built`),Q.innerHTML+=`Step ${n+1}/${t.length} : ${i.text}\n`,Q.scrollTop=Q.scrollHeight,e===`multi`&&i.role.startsWith(`runner-`)&&(document.querySelectorAll(`.ms-layer`).forEach(e=>{e.dataset.role.startsWith(`builder-`)&&(e.style.opacity=`0.35`,e.style.borderStyle=`dashed`)}),a.classList.remove(`layer--built`),a.classList.add(`layer--cached`)),n++,setTimeout(r,400)}setTimeout(r,300)});var ot=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&e.target.classList.add(`is-visible`)})},{threshold:.12});document.querySelectorAll(`.reveal`).forEach(e=>{ot.observe(e)}),h(0),_(`walkthrough`);