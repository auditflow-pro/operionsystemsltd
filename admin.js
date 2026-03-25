const ADMIN_KEY = "Operion2026";

function load(){
  const input = document.getElementById("key").value;

  if(input !== ADMIN_KEY){
    alert("Unauthorized");
    return;
  }

  document.getElementById("data").innerHTML =
    "<p>No live data yet — connect to Operion backend</p>";
}
