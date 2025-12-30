const EditItemRow = ({ item, ingInfo, onUpdate, onRemove }) => (
  <div className="flex items-center justify-between p-5 bg-white rounded-3xl border border-gray-100 hover:border-green-100 transition-all shadow-sm">
    <div className="flex flex-col">
      <span className="text-lg font-bold text-gray-900 leading-tight">
        {ingInfo.name}
      </span>
      <span className="text-xs font-black text-gray-400 uppercase">
        {ingInfo.unit}
      </span>
    </div>
    <div className="flex items-center gap-4">
      <div className="flex items-center bg-gray-50 rounded-2xl border border-gray-100 p-1">
        <button
          onClick={() => onUpdate(item.ingredientId, item.amount - 1)}
          className="w-10 h-10 flex items-center justify-center font-black text-gray-400 hover:text-green-600 hover:bg-white rounded-xl"
        >
          -
        </button>
        <input
          type="number"
          className="w-14 text-center font-black text-gray-900 bg-transparent focus:outline-none"
          value={item.amount}
          onChange={(e) =>
            onUpdate(item.ingredientId, parseInt(e.target.value) || 0)
          }
        />
        <button
          onClick={() => onUpdate(item.ingredientId, item.amount + 1)}
          className="w-10 h-10 flex items-center justify-center font-black text-gray-400 hover:text-green-600 hover:bg-white rounded-xl"
        >
          +
        </button>
      </div>
      <button
        onClick={() => onRemove(item.ingredientId)}
        className="w-10 h-10 flex items-center justify-center rounded-2xl text-gray-300 hover:text-red-500 hover:bg-red-50"
      >
        ✕
      </button>
    </div>
  </div>
);

export default EditItemRow;
