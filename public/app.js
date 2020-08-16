$(document).on("click", "#scrape", () => {
  $.get({
    type: "GET",
    url: "/scrape",
    success: (data) => {
      console.log(data);

      console.log("i am here now");

      location.reload();
    },
  });
});

$(document).on("click", "#delete", () => {
  $.get("/delete", function (data) {
    console.log(data);

    $("#wrapper").empty();
  });
});
