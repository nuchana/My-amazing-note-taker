// ===============================================================================
// DATA
// Below data will hold all of the reserved tables.
// Initially we just set it equal to a "dummy" customer.
// But you could have it be an empty array as well.
// ===============================================================================

var newNotesArray = [
    {
      title: "John's birthday part",
      text: "I need to buy a gift and pick up the flowers",
      id: "a123",
      
    }
  ];
  
  // Note how we export the array. This makes it accessible to other files using require.
  module.exports = newNotesArray;