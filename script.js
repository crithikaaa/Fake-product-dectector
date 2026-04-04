(function () {
  const VULNERABILITIES = [
    { title: "Public storage bucket detected", severity: "high" },
    { title: "Weak password policy", severity: "med" },
    { title: "Suspicious login attempts", severity: "high" },
    { title: "Outdated SSL certificate", severity: "med" },
  ];

  const SAMPLE_LOGS = [
    { level: "safe", ts: "2026-04-04T09:12:01Z", msg: "INFO  auth: MFA challenge succeeded user_id=svc-billing" },
    { level: "safe", ts: "2026-04-04T09:14:22Z", msg: "INFO  network: NSG default deny inbound rule applied subnet=prod-db" },
    { level: "warn", ts: "2026-04-04T09:18:44Z", msg: "WARN  identity: 5 failed password attempts from 203.0.113.88 (rate limited)" },
    { level: "vuln", ts: "2026-04-04T09:21:03Z", msg: "ALERT storage: Blob container 'reports-archive' has public access level=container" },
    { level: "safe", ts: "2026-04-04T09:22:11Z", msg: "INFO  keyvault: Secret rotation completed key=db-connection-string" },
    { level: "vuln", ts: "2026-04-04T09:25:50Z", msg: "CRIT  tls: Certificate for api.internal expired 12 days ago — cipher TLS_RSA_WITH_RC4_128_SHA" },
    { level: "warn", ts: "2026-04-04T09:28:17Z", msg: "WARN  policy: Password min length=6 (recommended >= 12) domain=corp.local" },
    { level: "vuln", ts: "2026-04-04T09:31:00Z", msg: "ALERT signin: Impossible travel login US→RO within 4 minutes user=admin@tenant" },
    { level: "safe", ts: "2026-04-04T09:33:40Z", msg: "INFO  defender: Real-time protection scan completed — no threats" },
  ];

  const runBtn = document.getElementById("runScanBtn");
  const scanLoading = document.getElementById("scanLoading");
  const scanResults = document.getElementById("scanResults");
  const progressFill = document.getElementById("progressFill");
  const progressBar = document.getElementById("progressBar");
  const securityScoreEl = document.getElementById("securityScore");
  const vulnCountEl = document.getElementById("vulnCount");
  const vulnList = document.getElementById("vulnList");
  const globalStatus = document.getElementById("globalStatus");
  const logViewport = document.getElementById("logViewport");

  function renderLogs() {
    logViewport.innerHTML = SAMPLE_LOGS.map(
      (row) =>
        `<div class="log-line ${row.level}"><span class="log-ts">${row.ts}</span>${escapeHtml(row.msg)}</div>`
    ).join("");
  }

  function escapeHtml(s) {
    const div = document.createElement("div");
    div.textContent = s;
    return div.innerHTML;
  }

  function setGlobalStatus(text, variant) {
    globalStatus.className = "status-pill " + variant;
    globalStatus.innerHTML = `<span class="pulse"></span>${text}`;
  }

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function animateProgress(durationMs, onDone) {
    const start = performance.now();
    function frame(now) {
      const t = Math.min(1, (now - start) / durationMs);
      const pct = Math.round(t * 100);
      progressFill.style.width = pct + "%";
      progressBar.setAttribute("aria-valuenow", String(pct));
      if (t < 1) requestAnimationFrame(frame);
      else onDone();
    }
    requestAnimationFrame(frame);
  }

  function renderVulnCards() {
    vulnList.innerHTML = VULNERABILITIES.map((v) => {
      const cls = v.severity === "high" ? "severity-high" : "severity-med";
      const badge = v.severity === "high" ? "Critical" : "Warning";
      return `<li class="vuln-card ${cls}"><span class="sev-badge">${badge}</span><span>${escapeHtml(v.title)}</span></li>`;
    }).join("");
  }

  runBtn.addEventListener("click", () => {
    runBtn.disabled = true;
    scanResults.classList.add("hidden");
    scanLoading.classList.remove("hidden");
    progressFill.style.width = "0%";
    progressBar.setAttribute("aria-valuenow", "0");
    setGlobalStatus("Scan in progress", "warn");

    animateProgress(3000, () => {
      scanLoading.classList.add("hidden");
      const score = randomInt(70, 95);
      const vulnCount = VULNERABILITIES.length;

      securityScoreEl.textContent = score;
      securityScoreEl.className = "metric-value " + (score >= 85 ? "safe" : score >= 75 ? "warn" : "vuln");
      vulnCountEl.textContent = String(vulnCount);

      renderVulnCards();
      scanResults.classList.remove("hidden");

      const statusVariant = score >= 85 ? "safe" : score >= 75 ? "warn" : "vuln";
      setGlobalStatus(
        score >= 85 ? "Posture acceptable" : score >= 75 ? "Review recommended" : "Elevated risk",
        statusVariant
      );

      runBtn.disabled = false;
    });
  });

  renderLogs();
})();
