document.addEventListener("DOMContentLoaded", function () {
  const navbarToggler = document.querySelector(".navbar-toggler");
  const sideMenu = document.querySelector(".side-menu");

  navbarToggler.addEventListener("click", function () {
    sideMenu.classList.toggle("active");
  });
});

var Date = new Date();
var date = Date.toLocaleString(); // Convert date to local date and time string
date=date+" IST";
console.log(date);
// Adding Query Selector

var length = document.querySelector("#length");
var width = document.querySelector("#width");
var height = document.querySelector("#height");
var printed = document.querySelector("#printed");
var quantity = document.querySelector("#quantity");
var PLY = document.querySelector("#PLY");
var rate = document.querySelector("#rate");
var price = document.querySelector("#price");
var ugsm = document.querySelector("#UGSM");
var fgsm = document.querySelector("#FGSM");
var lgsm = document.querySelector("#LGSM");
var margin = document.querySelector("#margin");
var prt_type = document.querySelector("#Prt");
var print = document.querySelector("#printed");
var Fixed_charge = document.querySelector("#fixed_charge");
var Die_cost= document.querySelector("#die_cost") ;
var form=document.querySelector("#form");

// Adding Event Listner

var Length, Width, Height, gsm, ply, Rate, Price, Printed=0.0, Quantity, UGSM, FGSM, LGSM,Margin=0.0;
margin.addEventListener("input", function () {
  if (document.getElementById( "margin" ).value =="") {
    Margin=0;
  }

  else{
  Margin = parseFloat(document.getElementById('margin').value);
  Margin = parseFloat(Margin);
  
  }
  console.log(Margin);
  Costing();
})

length.addEventListener("input", function () {
  Length = parseFloat(document.getElementById('length').value);
  Length = parseFloat(Length);
  // console.log(Length);
  

})

width.addEventListener("input", function () {
  Width = parseFloat(document.getElementById('width').value);
  Width = parseFloat(Width);
  // console.log(Width);
  Costing();

})

height.addEventListener("input", function () {
  Height = parseFloat(document.getElementById('height').value);
  Height = parseFloat(Height);
  // console.log(Height);
  Costing();

})

lgsm.addEventListener("input", function () {
  LGSM = parseFloat(document.getElementById('LGSM').value);
  LGSM = parseFloat(LGSM);
  console.log(LGSM);
  Costing();
})

fgsm.addEventListener("input", function () {
  FGSM = parseFloat(document.getElementById('FGSM').value);
  FGSM = parseFloat(FGSM);
  console.log(FGSM);
  Costing();
})
ugsm.addEventListener("input", function () {
  UGSM = parseFloat(document.getElementById('UGSM').value);
  UGSM = parseFloat(UGSM);
  console.log(UGSM);
  Costing();
})



quantity.addEventListener("input", function () {
  Quantity = parseFloat(document.getElementById('quantity').value);
  Quantity = parseFloat(Quantity);
  Costing();
})

print.addEventListener("change",function(){
  if (print.value=="Yes"){
    prt_ques.style.display="block";
    Die_cost.addEventListener("input",function(){
      Costing();
    })
    Fixed_charge.addEventListener("input",function(){
      Costing();
    })

  }
  else{
    prt_ques.style.display="none";
  }
})
prt_type.addEventListener("change", function () {
  
  Printed=0.000;
  // console.log(Printed);


  Costing();
  
})

PLY.addEventListener("input", function () {
  ply = parseInt(document.getElementById('PLY').value);
  ply = parseFloat(ply);
  // console.log(ply);
  Costing();

})

rate.addEventListener("input", function () {
  Rate = parseFloat(document.getElementById('rate').value);
  Rate = parseFloat(Rate);
  // console.log(Rate);
  Costing();
})

price.addEventListener("input", function () {
  Price = parseFloat(document.getElementById('price').value);
  Price = parseFloat(Price);

})


//var Length,Width,Height,gsm,ply,Rate,Price,Printed,Quantity,UGSM,FGSM,LGSM;
function cal_gsm(){
  var ugsm_factor = UGSM/1000;
  var fgsm_factor=(FGSM/1000);
  var lgsm_factor=(LGSM/1000);
  if (ply==3){
    fgsm_factor=fgsm_factor*1.5;
    lgsm_factor=lgsm_factor*1;

  }
  if (ply==5){
    fgsm_factor=fgsm_factor*1.5*2;
    lgsm_factor=lgsm_factor*2;
  }
  if (ply==7){
    fgsm_factor=fgsm_factor*1.5*3;
    lgsm_factor=lgsm_factor*3;
  }
  console.log(ugsm_factor);
  console.log(fgsm_factor);
  console.log(lgsm_factor);
  return ugsm_factor+fgsm_factor+lgsm_factor
}

function cal_print(){
  var fixed=0;
  if(document.getElementById("fixed_charge").value!=""){
    fixed=parseFloat(document.getElementById("fixed_charge").value);
  }
  var die_cost=0;
  if (document.getElementById("die_cost").value!=""){
    die_cost=parseFloat(document.getElementById("die_cost").value);
  }
 
  var color_cost=0.0;
  if(Quantity!=undefined){
    if (document.getElementById("Prt").value=="No"){
      color_cost=0;
    }
    if (document.getElementById("Prt").value=="Multi"){
      color_cost=1000;

    }
    if(document.getElementById("Prt").value=="Two"){
     
      color_cost=500;
    }
    console.log(color_cost);
  
  }
  Printed=(die_cost+fixed+color_cost)/Quantity;
  return Printed;
}
function check_values(){
  if  ((isNaN(Length))||(isNaN(Width))||(isNaN(Height))|| isNaN(ply)|| isNaN(Rate)||isNaN(Quantity)|| isNaN(UGSM)|| isNaN(FGSM)|| isNaN(LGSM)){
    return false;
  }
  else {
    return true;
  }
}

function Costing() {
  if (check_values()){
  var Sheet_Len = Width + Length + 2;
  var Sheet_Width = Width;
  var Sheet_Height = (Sheet_Len)*(Sheet_Width+Height)*(2);
  var gsm_fact=cal_gsm();
  var Total_Sheet= (gsm_fact*Sheet_Height)/1550;
  var Cost_Box=Total_Sheet* Rate;
  var Cost_print=cal_print(Cost_Box);
  console.log("Printed:"+Cost_print);
  Cost_Box=Cost_Box+((Margin*Cost_Box)/100.0)+Cost_print;

  
  console.log(Sheet_Height);
  console.log(gsm_fact);
  console.log(Total_Sheet);

  Total_Sheet=Total_Sheet*1000;
  Total_Sheet=Total_Sheet.toFixed(2);
  Cost_Box=Cost_Box.toFixed(2);
  var Order_Cost=(Cost_Box*Quantity);
  Order_Cost=Order_Cost.toFixed(2);

  var WPB=String(Total_Sheet)+" "+"g";
  var CPB=String(Cost_Box)+" "+"INR";
  var TV=String(Order_Cost)+" "+"INR";
  

  document.getElementById('wgh').value = Total_Sheet;
  document.getElementById('box_rater').value = Cost_Box;
  document.getElementById('price').value = Order_Cost;
  document.getElementById('wpb').innerHTML = WPB;
  document.getElementById('cpb').innerHTML = CPB;
  document.getElementById('tv').innerHTML = TV;


  handleFormSubmit();

}
}




function handleFormSubmit() {
  if ( document.getElementById('wgh').value =="" || document.getElementById('box_rater').value == "" || document.getElementById('price').value == ""){
      
    return;
  }
  var forms=document.querySelector('#form');
  var d=new FormData(forms);
  console.log(d);
  try {
      const response = fetch("https://script.google.com/macros/s/AKfycbyTE1AkovuRnWWSMrUq1_qQHbO8JYo3eFkmi3_VkLc3o7swUtVcMd90m11aXj_kMSrXHw/exec", {
        mode:'no-cors',
      method: "POST",
        body: d,
      });
      console.log(response)
    } catch (e) {
      console.error(e);
    }
 
}

var id = "ECD" + Math.random().toString(36).slice(7);

function validatePhoneNumber() {
  
  // Regular expression pattern for phone numbers
  var pattern = /^[6-9]\d{9}$/;
  var phone=parseInt(document.getElementById("phno").value);
  // Check if the provided phone number matches the pattern
  
  return pattern.test(phone);
}


function sendwhatsapp(){
document.getElementById("ID").value=id;
var phonenumber = "+91"+document.getElementById("phno").value;
if (phonenumber=="+91" || validatePhoneNumber()==false){
  alert("Please provide a valid phone number");
  return ;
}
if ( document.getElementById('wgh').value =="" || document.getElementById('box_rater').value == "" || document.getElementById('price').value == ""){
  alert("No data available to share");
  return;
}
var L=length.value;
var W=width.value;
var H=height.value;
var P=printed.value;
var Q=quantity.value;
var PL=PLY.value;
var UG=ugsm.value;
var FG=fgsm.value;
var LG=lgsm.value;
var Cpb=document.getElementById("box_rater").value;
var TC=document.getElementById("price").value;
var VT=document.getElementById("days").value;

  console.log(phonenumber);
  var WhatsappUrl = "https://wa.me/" + phonenumber + "?text="+"*QUOTATION* *DETAILS* "+"%0a"+"*Quotaion* *ID* *:* "+id+"%0a"
  +"*Length* *:* "+L+" inch"+"%0a"
  +"*Widh* *:* "+W+" inch"+"%0a"+"*Height* *:* "+H+" inch"+"%0a"+"*Quantity* *:* "+Q+"%0a"+"*PLY* *:* "+PL+"%0a"+"*Printed* *:* "+P+"%0a"+"*UGSM* *:* "+UG+"%0a"
  +"*FGSM* *:* "+FG+"%0a"+"*LGSM* *:* "+LG+"%0a"+"*Cost* *per* *box* *:* "+Cpb+"INR"+"%0a"+"*Order* *Cost* *:* "+TC+"INR"+"%0a"+"*Quotation* *valid* *till* *:* "+VT+" Days"+"%0a"+"*Time* *Stamp* *:* "+date;
  handleFormSubmit();
  window.open(WhatsappUrl,"_blank").focus();
  

}


function validateEmail() {
  // Regular expression pattern for email validation
  var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  // Check if the provided email matches the pattern
  return pattern.test(document.getElementById("mail").value);
}





function sendMail(){
  document.getElementById("ID").value=id;
  var mail = document.getElementById("mail").value;
  if (mail=="" || validateEmail()==false){
    alert("Please enter a valid email");
    return ;
  }
  if ( document.getElementById('wgh').value =="" || document.getElementById('box_rater').value == "" || document.getElementById('price').value == ""){
    alert("No data available to share");
    return;
  }
var L=length.value;
var W=width.value;
var H=height.value;
var P=printed.value;
var Q=quantity.value;
var PL=PLY.value;
var UG=ugsm.value;
var FG=fgsm.value;
var LG=lgsm.value;
var Cpb=document.getElementById("box_rater").value;
var TC=document.getElementById("price").value;
var VT=document.getElementById("days").value;
// var formattedBody="Quotation ID :"+id+"\n"+"Length :"+L+" inch"+"\n"
// +"Widh :"+W+" inch"+"\n"+"Height :"+H+" inch"+"\n"+"Quantity :"+Q+"\n"+"PLY :"+PL+"\n"+"Printed :"+P+"\n"+"UGSM :"+UG+"\n"
// +"FGSM :"+FG+"\n"+"LGSM :"+LG+"\n"+"Cost per box :"+Cpb+"INR"+"\n"+"Order Cost :"+TC+"INR"+"\n"+"Quotation valid till :"+VT+" Days"+"\n"+"Time Stamp :"+date;


var formattedBody = "<strong>Quotation ID:</strong> " + id + "<br>" +
    "<strong>Length:</strong> " + L + " inch" + "<br>" +
    "<strong>Width:</strong> " + W + " inch" + "<br>" +
    "<strong>Height:</strong> " + H + " inch" + "<br>" +
    "<strong>Quantity:</strong> " + Q + "<br>" +
    "<strong>PLY:</strong> " + PL + "<br>" +
    "<strong>Printed:</strong> " + P + "<br>" +
    "<strong>UGSM:</strong> " + UG + "<br>" +
    "<strong>FGSM:</strong> " + FG + "<br>" +
    "<strong>LGSM:</strong> " + LG + "<br>" +
    "<strong>Cost per box:</strong> " + Cpb + " INR" + "<br>" +
    "<strong>Order Cost:</strong> " + TC + " INR" + "<br>" +
    "<strong>Quotation valid till:</strong> " + VT + " Days" + "<br>" +
    "<strong>Time Stamp:</strong> " + date;

var mailurl = "mailto:" + mail+ "?subject=Quote Details&body="+encodeURIComponent(formattedBody);
// window.location.href = mailurl;
handleFormSubmit();
window.open(mailurl,"_blank").focus();

}

function share(){
  console.log(document.getElementById("mail").value);
  if (document.getElementById("mail").value!=""){
    sendMail();
  }
  else if (document.getElementById('phno').value!=""){
    sendwhatsapp();
  }
  else{
    alert("Please enter a customer's email or phone number");
  }
}

