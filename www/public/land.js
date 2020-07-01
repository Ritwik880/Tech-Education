var val=document.getElementById("ur").value;
var cl = document.getElementById("bu");
cl.onclick=function(){
    localStorage.setItem('hey2',JSON.stringify(val));
    window.document.location='wwww/calibration.html';
};
