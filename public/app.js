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

console.log(window.location.pathname);

$(document).on("click", ".savebtn", function () {
  var artNum = {
    artNum: $(this).attr("id"),
    isSaved: true,
  };

  if (window.location.pathname === "/saved") {
    artNum.isSaved = false;
  }

  $.post("/api/saved", artNum, (data) => {
    $(this).prev().hide();
    $(this).hide();
    console.log(data);
  });
});

$(document).on("click", ".noteBtn", function () {
  console.log();

  var note = {
    noteNum: $(this).prev().attr("id"),
    title: $(".noteTitle").val(),
    body: $(".noteBody").val(),
  };

  $(".noteSubmit").on("click", function () {
    $.post("/api/note", note, (data) => {
      console.log(data);
    });
  });
});
