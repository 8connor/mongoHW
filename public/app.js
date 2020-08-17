$(document).on("click", "#scrape", () => {
  $.get({
    type: "GET",
    url: "/scrape",
    success: (data) => {
      console.log(data);

      location.reload();
    },
  });
});

$(document).on("click", "#delete", () => {
  $.get({
    type: "GET",
    url: "/delete",
    success: (data) => {
      console.log(data);

      $("#wrapper").empty();
    },
  });
});

$(document).on("click", ".savebtn", function () {
  var artNum = {
    artNum: $(this).attr("id"),
  };


  $.post("/api/saved", artNum, (data) => console.log(data));

});
