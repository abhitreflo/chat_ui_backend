const Channels = [
  { id: 1, name: "Channel_1" },
  { id: 2, name: "Channel_2" },
  { id: 3, name: "Channel_3" },
  { id: 4, name: "Channel_4" },
  { id: 5, name: "Channel_5" },
  { id: 6, name: "Channel_6" },
  { id: 7, name: "Channel_7" },
  { id: 8, name: "Channel_8" },
  { id: 9, name: "Channel_9" },
];

export default Channels;

export const Channels_Search = (word: any) => {
  let x = Channels.filter((i: any) => {
    return (
      i.name.toLowerCase().startsWith(word.toLowerCase()) ||
      i.name.toLowerCase().includes(word.toLowerCase())
    );
  });

  return x;
};
