UI.registerHelper('equals', function (check1, check2) {
  return check1 === check2;
});

UI.registerHelper('multiple', function(number, multipler) {
  if(number%multipler===0)
    return true;
  else
    return false;
});