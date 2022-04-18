const Dummy_Data = [
    { id: 1, name: 'Mihir1' },
    { id: 2, name: 'Abhi1' },
    { id: 3, name: 'Test1' },
    { id: 4, name: 'Mihir2' },
    { id: 5, name: 'Abhi2' },
    { id: 6, name: 'Test2' },
];

export default Dummy_Data;


export const Dummy_Data_Search=(word:any)=>{
    /* console.log(Dummy_Data.filter((i:any) => i.name.startsWith('word')))
    return Dummy_Data */
    const x=Dummy_Data.filter((i:any) => i.name.toLowerCase().startsWith(word.toLowerCase()));
    //console.log("searching",x)
    return x

}