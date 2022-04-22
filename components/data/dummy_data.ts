const Dummy_Data = [
  { id: 1, name: "Channel_1" },
  { id: 2, name: "Channel_2" },
  { id: 3, name: "Channel_3" },
  { id: 4, name: "Channel_4" },
  { id: 5, name: "Channel_5" },
  { id: 6, name: "Channel_6" },
  { id: 7, name: "Channel_7" },
  { id: 8, name: "Channel_8" },
  { id: 9, name: "Channel_9" },
  /*{ id: 10, name: "Channel_10" },
    { id: 11, name: 'e Channel_11' },
    { id: 12, name: 'f Channel 12' },
    { id: 13, name: 'g Channel 13' },
    { id: 14, name: 'h Channel 14' },
    { id: 15, name: 'i Channel 15' },
    { id: 16, name: 'j Channel 16' },
    { id: 17, name: 'k Channel 17' }, */
];

export default Dummy_Data;

export const Dummy_Data_Search = (word: any) => {
  /* console.log(Dummy_Data.filter((i:any) => i.name.startsWith('word')))
    return Dummy_Data */
  let x = Dummy_Data.filter((i: any) => {
    return (
      i.name.toLowerCase().startsWith(word.toLowerCase()) ||
      i.name.toLowerCase().includes(word.toLowerCase())
    );
  });
  //console.log("searching", x);

  return x;
};
