(() => {
  const data = window.AIVideoSiteData;
  const app = document.getElementById("app");
  const page = document.body.dataset.page;
  const variantName = document.body.dataset.variantName;

  const pageMeta = data.pages[page];
  const nav = Object.entries(data.pages)
    .map(([key, meta]) => {
      const current = key === page ? "is-active" : "";
      return `<a class="nav-link ${current}" href="${meta.file}">${meta.label}</a>`;
    })
    .join("");

  const refsList = data.references
    .map((item) => `<li>${item}</li>`)
    .join("");

  const shell = (mainHtml, extraClass = "") => `
    <div class="page-shell ${extraClass}">
      <header class="site-header">
        <div class="brand-block">
          <a href="index.html" class="brand-mark">AI</a>
          <div>
            <div class="brand-title">${data.siteTitle}</div>
            <div class="brand-subtitle">${variantName}</div>
          </div>
        </div>
        <nav class="site-nav">${nav}</nav>
      </header>
      <main class="site-main">${mainHtml}</main>
      <footer class="site-footer">
        <div>
          <strong>Content basis:</strong> prior literature review + 7350 manuscript structure.
        </div>
        <div class="footer-note">Preview variant: ${variantName}</div>
      </footer>
    </div>
  `;

  const pageHero = (pageTitle, pageIntro, extraHtml = "", heroClass = "") => `
    <section class="hero-strip ${heroClass}">
      <p class="eyebrow">${data.home.eyebrow}</p>
      <h1>${pageTitle}</h1>
      <p class="page-intro">${pageIntro}</p>
      ${extraHtml}
    </section>
  `;

  const jumpPanel = (label, title, intro, links, panelClass = "") => `
    <nav class="jump-panel ${panelClass}" aria-label="${label}">
      <div class="jump-panel-head">
        <p class="jump-panel-kicker">${label}</p>
        <h2 class="jump-panel-title">${title}</h2>
        <p class="jump-panel-copy">${intro}</p>
      </div>
      <div class="jump-grid">
        ${links.map((item, index) => `
          <a class="jump-link" href="#${item.target}">
            <span class="jump-index">${String(index + 1).padStart(2, "0")}</span>
            <span class="jump-label">${item.label}</span>
            <span class="jump-note">${item.note}</span>
          </a>
        `).join("")}
      </div>
    </nav>
  `;

  const renderHome = () => {
    const stats = data.home.stats
      .map((item) => `
        <article class="stat-chip">
          <span class="stat-value">${item.value}</span>
          <span class="stat-label">${item.label}</span>
        </article>
      `)
      .join("");

    const notes = data.home.quickNotes
      .map((item) => `
        <article class="feature-card">
          <h3>${item.title}</h3>
          <p>${item.text}</p>
        </article>
      `)
      .join("");

    const routes = data.featuredRoutes
      .map((item) => `
        <a class="route-card" href="${data.pages[item.page].file}">
          <div class="route-kicker">${data.pages[item.page].label}</div>
          <h3>${item.title}</h3>
          <p>${item.summary}</p>
          <span class="route-cta">Open page</span>
        </a>
      `)
      .join("");

    const toolPreview = data.tools.slice(0, 4).map((tool) => `
      <article class="tool-preview-card">
        <div class="tool-preview-top">
          <h3>${tool.name}</h3>
          <span>${tool.developer}</span>
        </div>
        <p>${tool.bestFor}</p>
      </article>
    `).join("");

    const main = `
      <section class="hero-strip hero-home">
        <div class="hero-grid">
          <div class="hero-copy">
            <p class="eyebrow">${data.home.eyebrow}</p>
            <h1>${data.home.headline}</h1>
            <p class="hero-lede">${data.home.lede}</p>
            <div class="hero-actions">
              <a class="button primary" href="${data.pages.tools.file}">Open Tool Matrix</a>
              <a class="button secondary" href="${data.pages.scenarios.file}">Browse Scenario Cards</a>
            </div>
          </div>
          <div class="stat-grid">${stats}</div>
        </div>
      </section>

      <div class="home-section-grid">
        <section class="section-block">
          <div class="section-heading">
            <p class="eyebrow">SITE LOGIC</p>
            <h2>What each page is designed to do</h2>
          </div>
          <div class="route-grid">${routes}</div>
        </section>

        <section class="section-block">
          <div class="section-heading">
            <p class="eyebrow">FAST READ</p>
            <h2>Three framing notes before you dive in</h2>
          </div>
          <div class="feature-grid">${notes}</div>
        </section>

        <section class="section-block split-layout">
          <div>
            <div class="section-heading">
              <p class="eyebrow">SELECTED TOOLS</p>
              <h2>Preview the comparison set</h2>
            </div>
            <div class="tool-preview-grid">${toolPreview}</div>
          </div>
          <aside class="reference-panel">
            <p class="eyebrow">SOURCE LAYER</p>
            <h3>Reference backbone</h3>
            <ul class="reference-list">${refsList}</ul>
          </aside>
        </section>
      </div>
    `;

    return shell(main, "page-home");
  };

  const renderTools = () => {
    const rows = data.tools.map((tool) => `
      <tr>
        <td><strong>${tool.name}</strong><span class="td-sub">${tool.developer}</span></td>
        <td>${tool.bestFor}</td>
        <td>${tool.strengths}</td>
        <td>${tool.limitations}</td>
        <td>${tool.notes}</td>
      </tr>
    `).join("");

    const main = `
      <div class="page-columns">
        ${pageHero(
          "Tool Matrix",
          "This page is intentionally table-first. It helps compare tools side by side instead of presenting them as isolated product blurbs."
        )}
        <div class="content-column">
          <section class="section-block">
            <div class="section-heading">
              <p class="eyebrow">SUBPAGE 1</p>
              <h2>Selected AI video tools mentioned across the review and manuscript</h2>
            </div>
            <div class="table-wrap">
              <table class="tool-table">
                <thead>
                  <tr>
                    <th>Tool</th>
                    <th>Best fit</th>
                    <th>Main strengths</th>
                    <th>Main limitations</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>${rows}</tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    `;

    return shell(main, "page-tools");
  };

  const renderScenarios = () => {
    const scenarioTargets = {
      0: "scenario-film-tv",
      3: "scenario-medical-education",
      6: "scenario-virtual-humans",
    };

    const cards = data.scenarios.map((item, index) => `
      <article class="scenario-card ${scenarioTargets[index] ? "jump-target" : ""}"${scenarioTargets[index] ? ` id="${scenarioTargets[index]}"` : ""}>
        <div class="scenario-tag">${item.tag}</div>
        <h3>${item.title}</h3>
        <p class="scenario-hook">${item.hook}</p>
        <p>${item.body}</p>
        <div class="scenario-caution">
          <strong>Caution:</strong> ${item.caution}
        </div>
      </article>
    `).join("");

    const main = `
      <div class="page-columns">
        ${pageHero(
          "Scenario Cards",
          "This page converts the literature review into cards so the information reads more like an applied map than a formal report.",
          jumpPanel(
            "QUICK JUMP",
            "Move through the scenario map",
            "Use this side-rail navigator to jump straight to the cards that matter most for your reading path.",
            [
              {
                target: "scenario-film-tv",
                label: "Film & TV",
                note: "Previsualization and creative validation",
              },
              {
                target: "scenario-medical-education",
                label: "Medical Education",
                note: "Procedure explanation and patient learning",
              },
              {
                target: "scenario-virtual-humans",
                label: "Virtual Humans",
                note: "Avatar delivery and guided interaction",
              },
            ],
            "jump-panel-scenarios"
          ),
          "has-jump-panel"
        )}
        <div class="content-column">
          <section class="section-block">
            <div class="section-heading">
              <p class="eyebrow">SUBPAGE 2</p>
              <h2>Application scenarios shown as scan-friendly cards</h2>
            </div>
            <div class="scenario-grid">${cards}</div>
          </section>
        </div>
      </div>
    `;

    return shell(main, "page-scenarios");
  };

  const renderControversies = () => {
    const stats = data.controversies.stats.map((item) => `
      <article class="stat-chip alt">
        <span class="stat-value">${item.value}</span>
        <span class="stat-label">${item.label}</span>
      </article>
    `).join("");

    const controversyTargets = {
      0: "controversy-authenticity",
      1: "controversy-copyright",
      2: "controversy-platforms",
    };

    const sections = data.controversies.sections.map((section, index) => `
      <article class="controversy-card ${controversyTargets[index] ? "jump-target" : ""}"${controversyTargets[index] ? ` id="${controversyTargets[index]}"` : ""}>
        <h3>${section.title}</h3>
        <p class="controversy-summary">${section.summary}</p>
        <ul class="point-list">
          ${section.points.map((point) => `<li>${point}</li>`).join("")}
        </ul>
      </article>
    `).join("");

    const main = `
      <div class="page-columns">
        ${pageHero(
          "Key Controversies in AI Video Generation",
          "This page is adapted from the manuscript's third subpage and keeps its focus on governance, law, and platform accountability.",
          jumpPanel(
            "QUICK JUMP",
            "Enter each controversy cluster",
            "The side panel turns the spare hero area into a shortcut layer for the page's three main arguments.",
            [
              {
                target: "controversy-authenticity",
                label: "Authenticity",
                note: "Deepfakes, trust erosion, and misinformation",
              },
              {
                target: "controversy-copyright",
                label: "Copyright & Voice",
                note: "Training data, likeness, and ownership",
              },
              {
                target: "controversy-platforms",
                label: "Platform Rules",
                note: "Labeling, traceability, and enforcement gaps",
              },
            ],
            "jump-panel-controversies"
          ),
          "has-jump-panel"
        )}
        <div class="content-column">
          <section class="section-block split-layout">
            <div>
              <div class="section-heading">
                <p class="eyebrow">SUBPAGE 3</p>
                <h2>Key controversies in AI video generation</h2>
              </div>
              <p>${data.controversies.intro}</p>
            </div>
            <div class="stat-grid compact">${stats}</div>
          </section>
          <section class="section-block">
            <div class="controversy-grid">${sections}</div>
          </section>
          <section class="section-block conclusion-band jump-target" id="controversy-conclusion">
            <p>${data.controversies.close}</p>
          </section>
        </div>
      </div>
    `;

    return shell(main, "page-controversies");
  };

  const renderMarketing = () => {
    const cases = data.marketing.cases.map((item) => `
      <article class="feature-card">
        <h3>${item.title}</h3>
        <p>${item.text}</p>
      </article>
    `).join("");

    const perspectives = data.marketing.perspectives.map((item) => `
      <article class="perspective-card">
        <h3>${item.title}</h3>
        <p>${item.text}</p>
      </article>
    `).join("");

    const trends = data.marketing.trends.map((item) => `
      <article class="trend-card">
        <h3>${item.title}</h3>
        <p>${item.text}</p>
      </article>
    `).join("");

    const recommendations = data.marketing.recommendations.map((item) => `<li>${item}</li>`).join("");
    const myths = data.marketing.myths.map((item) => `
      <article class="myth-card">
        <h3>${item.title}</h3>
        <p>${item.text}</p>
      </article>
    `).join("");

    const main = `
      <div class="page-columns">
        ${pageHero(
          "Advertising & Marketing",
          "This page adapts the manuscript's fourth subpage into a cleaner commercial-production overview with cases, perspectives, trends, and myth checks.",
          jumpPanel(
            "QUICK JUMP",
            "Scan the commercial workflow",
            "Jump directly to the operational blocks below instead of scrolling section by section.",
            [
              {
                target: "marketing-cases",
                label: "Case Snapshots",
                note: "Named examples and practical reference points",
              },
              {
                target: "marketing-perspectives",
                label: "Perspectives",
                note: "How creators, platforms, media, and legal circles respond",
              },
              {
                target: "marketing-trends",
                label: "Trends",
                note: "Direction of tool capabilities and workflows",
              },
              {
                target: "marketing-myths",
                label: "Myth Check",
                note: "Common misconceptions to correct before deployment",
              },
            ],
            "jump-panel-marketing"
          ),
          "has-jump-panel"
        )}
        <div class="content-column">
          <section class="section-block">
            <div class="section-heading">
              <p class="eyebrow">SUBPAGE 4</p>
              <h2>AI video in advertising and marketing</h2>
            </div>
            <p>${data.marketing.intro}</p>
          </section>
          <section class="section-block jump-target" id="marketing-cases">
            <div class="section-heading">
              <p class="eyebrow">CASE SNAPSHOTS</p>
              <h2>Examples named in the manuscript</h2>
            </div>
            <div class="feature-grid">${cases}</div>
          </section>
          <section class="section-block jump-target" id="marketing-perspectives">
            <div class="section-heading">
              <p class="eyebrow">FOUR PERSPECTIVES</p>
              <h2>How stakeholders read the shift</h2>
            </div>
            <div class="feature-grid">${perspectives}</div>
          </section>
          <section class="section-block split-layout jump-target" id="marketing-trends">
            <div>
              <div class="section-heading">
                <p class="eyebrow">TRENDS</p>
                <h2>Where the tools are heading</h2>
              </div>
              <div class="feature-grid">${trends}</div>
            </div>
            <aside class="reference-panel">
              <p class="eyebrow">STANDARDIZATION</p>
              <h3>Recommendations</h3>
              <ul class="point-list">${recommendations}</ul>
            </aside>
          </section>
          <section class="section-block jump-target" id="marketing-myths">
            <div class="section-heading">
              <p class="eyebrow">MYTH CHECK</p>
              <h2>Common misunderstandings</h2>
            </div>
            <div class="feature-grid">${myths}</div>
          </section>
        </div>
      </div>
    `;

    return shell(main, "page-marketing");
  };

  const renders = {
    home: renderHome,
    tools: renderTools,
    scenarios: renderScenarios,
    controversies: renderControversies,
    marketing: renderMarketing,
  };

  if (!renders[page]) {
    app.innerHTML = shell(pageHero("Page missing", "The requested page could not be found."));
    return;
  }

  app.innerHTML = renders[page]();
  document.title = `${pageMeta.label} · ${variantName}`;
})();
