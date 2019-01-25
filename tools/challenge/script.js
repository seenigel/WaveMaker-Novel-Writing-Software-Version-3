hideNavBar()

if(!WMproject.state){
  WMproject.state={}
}
WMproject.state.tool= "challenge" ;
if (!WMproject.data) {
  WMproject.data = {};
}
if (!WMproject.data.distraction_free) {
  WMproject.data.distraction_free = [];
}
savedata()
function savedata() {
  db.projects.update(WMproject.id, WMproject).then(function () {
    saveWavemaker();
  });
}




var target = 150;
var timer = 5 * 60;

$(function () {
  $("#result").hide();
  autosize($('.texteditor'));
  //setTimeout(typeWriter, speed);

  $("#letsgo").click(function () {
    console.log($("#ds_settings").val())
    timer = $("#ds_settings").val() * 60
    target = $("#ds_settings").val() * 30
    $("#startform").fadeOut()
    setTimeout(writetimer, 1000);
    $('#demo').focus();
  })
})

function writetimer() {
  if (timer == 0) {
    $("#displayTimer").html('<button onclick="finish()" class="timerselect">Finish</button>')
  } else {
    timer = timer - 1;
    $("#displayTimer").html(timer + " seconds left")
    setTimeout(writetimer, 1000);
  }
}



document.onkeydown = checkKey;

function checkKey(e) {

  e = e || window.event;



  if (e.keyCode == '38') {
    // up arrow
    e.preventDefault();
  }
  else if (e.keyCode == '40') {
    // down arrow
    e.preventDefault();
  }
  else if (e.keyCode == '37') {
    e.preventDefault();
    // left arrow
  }
  else if (e.keyCode == '39') {
    e.preventDefault();
    // right arrow
  }


  getwordcount($("#demo"))
}


function getwordcount(el) {
  var val = $.trim(el.val());
  if (val === "") {
    words = 0;
  } else {
    words = val.replace(/\s+/gi, ' ').split(' ').length;
    chars = val.length;
  }
  per = (100 / target) * words
  if (per > 100) { per = 100; }
  per = parseInt(per);
  per = per / 100;
  if (per < 0.2) { per = 0.2 }

  $("#displayCount").css('color', 'rgba(255,255,255,' + per + ')');
  res = target - words
  if (res < 1) {
    res = "All Done";
    $("#displayCount").html('<button onclick="finish()" class="timerselect">Finish</button>')
  } else {
    res = res + " words remain"
    $("#displayCount").text(res);
  }


}

function finish() {
  $(".resultholder").html(nl2br($("#demo").val()))
  markdown= html2markdown($(".resultholder").html())
  var eventtime = new Date();

  WMproject.data.writer.push({
    icon: "fa fa-fw fa-trophy",
    title : eventtime,
    data : {
      content : markdown
    }
  })
  $("#result").show();
  $("#demo").val('');
}


function nl2br(str, is_xhtml) {
  var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
  return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
}