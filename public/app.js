$(document).on("click", "#scrape", () => {
  $.get({
    type: "GET",
    url: "/scrape",
    success: (data) => {
      location.reload();
    },
  });
});

$(document).on("click", "#delete", () => {
  $.get({
    type: "GET",
    url: "/delete",
    success: (data) => {
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
  });
});

$(document).on("click", ".noteBtn", function () {
  var note = {
    artNum: $(this).prev().attr("id"),
  };

  $(".noteSubmit").on("click", function () {

    note.title = $("#noteTitle").val();
    note.body = $("#noteBody").val();

    $.post("/api/note", note);
  });
});
