const plans = {
  train: {
    none: "Split: private cluster 50 · cloud GPU 35 · reserved hedge 15.\nWhy: training wants cheap contiguous hours more than single-digit latency.\nTrade-off: you accept queue risk if the private cluster fills.",
    eu: "Split: sovereign EU 70 · reserved hedge 30.\nWhy: the data-bound constraint beats raw price.\nTrade-off: fewer GPU SKUs, longer calendar time.",
    lat: "Split: edge 20 · nearest cloud GPU 60 · private 20.\nWhy: training rarely needs edge, so the plan still parks most hours on bulk GPUs.\nTrade-off: you pay for a latency floor you may not use.",
  },
  infer: {
    none: "Split: cloud GPU 55 · private 25 · edge 20.\nWhy: inference wants warm capacity close to users.\nTrade-off: cost rises if you over-provision edge.",
    eu: "Split: sovereign EU 80 · edge-in-region 20.\nWhy: answers stay with the data.\nTrade-off: fewer burst options during a quota shock.",
    lat: "Split: edge 65 · nearest region GPU 35.\nWhy: control-loop latency is the constraint, not unit price.\nTrade-off: you leave cheaper bulk GPUs unused.",
  },
  edge: {
    none: "Split: edge 70 · private 20 · cloud burst 10.\nWhy: robotics wants the loop on-box, with a burst path if the cell fails.\nTrade-off: you operate more sites.",
    eu: "Split: EU edge 75 · sovereign cluster 25.\nWhy: both the loop and the logs stay in-region.\nTrade-off: no US burst path.",
    lat: "Split: on-cell edge 90 · nearest private 10.\nWhy: the plan refuses a distant GPU as primary.\nTrade-off: almost no overflow.",
  },
};

document.getElementById("router").addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(event.target);
  const kind = data.get("kind");
  const bind = data.get("bind");
  const out = document.getElementById("plan");
  out.hidden = false;
  out.textContent = plans[kind][bind];
});

document.getElementById("request-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(event.target);
  const subject = encodeURIComponent("ComputeFlow routing brief request");
  const body = encodeURIComponent(
    `Name: ${data.get("name")}\nEmail: ${data.get("email")}\n\n${data.get("note")}`,
  );
  const status = document.getElementById("request-status");
  status.hidden = false;
  status.textContent =
    "This page does not send mail. Your mail client will open with a draft.";
  window.location.href = `mailto:?subject=${subject}&body=${body}`;
});
