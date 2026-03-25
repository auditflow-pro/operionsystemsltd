<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Operion Admin</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>

<header>
  <h1>Operion Admin</h1>
</header>

<!-- LOGIN -->
<section id="loginSection">
  <h3>Admin Login</h3>
  <input type="email" id="adminEmail" placeholder="Email">
  <input type="password" id="adminPassword" placeholder="Password">
  <button onclick="adminLogin()">Login</button>
  <p id="loginStatus"></p>
</section>

<!-- ADMIN -->
<section id="adminSection" style="display:none;">

  <div class="toolbar">
    <button onclick="loadOverview()">Refresh Overview</button>
    <button onclick="loadPending()">Pending Approvals</button>
    <button onclick="adminLogout()">Logout</button>
  </div>

  <h3>System Overview</h3>
  <div id="overview">
    <p>Loading...</p>
  </div>

  <h3>Automation Queue</h3>
  <table id="approvalTable">
    <thead>
      <tr>
        <th>ID</th>
        <th>Enquiry</th>
        <th>AI Response</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody></tbody>
  </table>

</section>

<script src="app.js"></script>
</body>
</html>