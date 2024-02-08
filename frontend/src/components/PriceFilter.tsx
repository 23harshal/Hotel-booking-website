type Props = {
    selectedPrice? : number;
    onChange : (value? : number) => void;
};

const PriceFilter = ({selectedPrice, onChange}: Props) => {
    const prices = [100,300,500,1000,2000,3000,4000,5000,7000,10000,15000,20000,
                    30000,50000,100000,5000000] 
  return (
    <div>
      <h4 className="text-md font-semibold">Max Price</h4>
      <select value={selectedPrice} 
      className="p-2 border rounded-md w-full"
      onChange={(event) => onChange(event.target.value ? parseInt(event.target.value) : undefined)}
      >
        <option value="">Select Max Price</option>
        {prices.map((price) => (
            <option value={price}>{price}</option>
        ))}
      </select>
    </div>
  )
}

export default PriceFilter
