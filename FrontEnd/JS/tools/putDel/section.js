function showSection(sectionName) {
  const sections = document.querySelectorAll("#sections > div");
  sections.forEach((div) => div.classList.add("d-none"));
  document.getElementById("section-" + sectionName).classList.remove("d-none");
}
