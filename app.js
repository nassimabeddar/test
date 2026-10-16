async function main() {
  const etat = document.getElementById("etat");
  const url = `${BASE}/bv/01.json`;
  const debut = performance.now();

  let data;
  try {
    const rep = await fetch(url);
    if (!rep.ok) throw new Error(`HTTP ${rep.status}`);
    data = await rep.json();
  } catch (err) {
    etat.textContent = `échec du chargement (${url}) : ${err.message}`;
    return;
  }

  const ms = Math.round(performance.now() - debut);
  const codes = Object.keys(data);
  etat.textContent = `${codes.length} bureaux chargés depuis ${url} en ${ms} ms`;

  // colonnes scalaires seulement : "rec" et "inscs" sont des objets imbriqués
  const colonnes = Object.keys(data[codes[0]]).filter(
    (k) => typeof data[codes[0]][k] !== "object"
  );

  const table = document.getElementById("tableau");
  const thead = table.createTHead().insertRow();
  thead.insertCell().textContent = "bureau";
  for (const c of colonnes) thead.insertCell().textContent = c;

  const tbody = table.createTBody();
  for (const code of codes) {
    const ligne = tbody.insertRow();
    ligne.insertCell().textContent = code;
    for (const c of colonnes) ligne.insertCell().textContent = data[code][c] ?? "";
  }
}

main();
