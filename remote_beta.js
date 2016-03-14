// Your code here
var myArray = [];
myArray.push('Sara Pearce', 'sarapearce');

function cutName(string) {
    var parts = [];
    var names = [];
    var names = string.split(' ');
    parts.push(names[0], names[1]);
    return parts;
}

var myData = {};
myData = {
  fullName: cutName(myArray[0]),
  skype: myArray[1],
  github: 'sarapearce'
};

