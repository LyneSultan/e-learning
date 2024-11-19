export const handleBanUnban = (userId, banStatus) => {
  const data = new FormData();
  data.append("user_id", userId);
  data.append("ban", banStatus);

  fetch("http://localhost/e-learning/server-side/ban.php", {
    method: "POST",
    body: data,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
