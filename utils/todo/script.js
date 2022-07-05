$(document).ready(function() {
ti = setTimeout(function() {
scrollTo(0, 0);
}, 100);
$('.fancybox').fancybox();

if (localStorage) {
} else {
$("body").html("<h1>please use the latest version of your browser to be able to store notes</h1>");
}

function update() {
if (localStorage.getItem("notes") == null) {
localStorage.setItem("notes", JSON.stringify({"notes": [["buy t-shirt from xstore", 1]]}));
}
$(".note").each(function(k, elen) {
$(elen).parent().remove();
});
jsonobj=$.parseJSON(localStorage.getItem("notes"));
for (i=0; i<=jsonobj.notes.length-1; i++) {
if (jsonobj.notes[i][1]) {
$("#add").parent().before('<li class="checked"><span contenteditable="false" class="check">✔</span><div contenteditable="true" class="note">'+jsonobj.notes[i][0]+'</div><span contenteditable="false" class="delete">✘</span></li>');
} else {
$("#add").parent().before('<li><span contenteditable="false" class="check">◻</span><div contenteditable="true" class="note">'+jsonobj.notes[i][0]+'</div><span contenteditable="false" class="delete">✘</span></li>');
}
}
}
update();

function savetodos(thatele) {
clearTimeout(ti);
ti = setTimeout(function() {
liston={'notes': []};
$(".note").each(function(j, ele) {
liston.notes[j]=[];
liston.notes[j][0] = $(ele).html();
if ($(ele).parent().hasClass("checked")) {
liston.notes[j][1] = 1;
} else {
liston.notes[j][1] = 0;
}
});
localStorage.setItem("notes", JSON.stringify(liston));
}, 100);
}

function clearprompt() {
clearallnotes=confirm("Are you sure you want to delete all notes? ");
if (clearallnotes) {
localStorage.clear();
update();
}
}

function togglechecked(tglele) {
if ($(tglele).parent().hasClass("checked")) {
$(tglele).parent().removeClass("checked");
$(tglele).html("◻");
} else {
$(tglele).parent().addClass("checked");
$(tglele).html("✔");
}
savetodos();
}

$("#clearnotes").click(function() {
clearprompt();
});

$("#add").parent().click(function() {
prevhtml=$("#add").parent().prev().find(".note").html();
if (prevhtml == "" || prevhtml == "&nbsp;" || prevhtml == "<br>") {
} else {
$("#add").parent().before('<li><span contenteditable="false" class="check">◻</span><div contenteditable="true" class="note">&nbsp;</div><span contenteditable="false" class="delete">✘</span></li>');
$("ol li:nth-last-child(2) .note").focus();
}
});
$("ol").on("click", ".delete", function() {
del=confirm("Are you sure you want to delete the note? ");
if (del) {
$(this).parent().remove();
}
});
$("ol").on("focus", ".note", function() {
$(this).parent().find(".delete").css("display", "block");
});
$("ol").on("blur", ".note", function() {
noteele=this;
setTimeout(function() {
$(noteele).parent().find(".delete").css("display", "none");
}, 300);
savetodos(this);
});
$("ol").on("keyup", ".note", function() {
savetodos(this);
});
$("ol").on("click", ".check", function() {
togglechecked(this);
});

});
