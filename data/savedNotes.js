// ===============================================================================
// DATA
// Below data will hold all of the reserved tables.
// Initially we just set it equal to a "dummy" customer.
// But you could have it be an empty array as well.
// ===============================================================================

var savedNotesArray = [
    {
      title: "Dog walker",
      text: "I need to call up the dog walker",
      id: "a456",
      
    }
  ];
  
  // Note how we export the array. This makes it accessible to other files using require.
  module.exports = savedNotesArray;