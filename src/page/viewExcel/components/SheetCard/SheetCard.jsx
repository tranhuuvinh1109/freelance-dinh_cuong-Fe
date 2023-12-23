/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types

const SheetRow = ({ data, isLass }) => {
  return (
    <div className={`${isLass ? '' : 'border-b '}flex  border-zinc-900`}>
      <div className="w-[17.39%] border-r border-zinc-900 px-2 py-1 flex items-center">{data[1]}</div>
      <div className="w-[8.69%] border-r border-zinc-900 px-2 py-1 flex items-center">{data[2]}</div>
      <div className="w-[14.6%] border-r border-zinc-900 px-2 py-1 flex items-center">{data[3]}</div>
      <div className="w-[10.95%] border-r border-zinc-900 px-2 py-1 flex items-center">{data[4]}</div>
      <div className="w-[10.95%] border-r border-zinc-900 px-2 py-1 flex items-center">{data[5]}</div>
      <div className="w-[9.13%] flex items-center  border-r px-2 border-zinc-900 py-1">{data[6]}</div>
      <div className="w-[28.29%] flex items-center border-r border-zinc-900 px-2 py-1">{data[7]}</div>
    </div>
  );
};
const SheetCard = ({ data }) => {
  return (
    <div className="flex border-b border-zinc-900">
      <div className="w-[8%] border-x border-zinc-900 px-2 py-1 flex items-center ">{data.location}</div>
      <div className="w-[92%]">
        {data.items.map((item, index) => {
          return <SheetRow data={item} key={index} isLass={index === data.items.length - 1} />;
        })}
      </div>
    </div>
  );
};

export default SheetCard;
