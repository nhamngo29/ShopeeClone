import { range } from "lodash";
import { useEffect, useState } from "react";

interface Props {
  onChange?: (value: Date) => void;
  value?: Date;
  errorMessage?: string;
}

export default function DateSelect({ value, onChange, errorMessage }: Props) {
  const [date, setDate] = useState({
    date: value?.getDate() || 1,
    month: value?.getMonth() || 0,
    year: value?.getFullYear() || 1990,
  });

  // Đồng bộ hóa khi `value` thay đổi
  useEffect(() => {
    if (value) {
      setDate({
        date: value.getDate(),
        month: value.getMonth(),
        year: value.getFullYear(),
      });
    }
  }, [value]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value: valueFromSelect } = event.target;
    const newDate = {
      ...date,
      [name]: Number(valueFromSelect), // Cập nhật giá trị
    };
    setDate(newDate);
    onChange && onChange(new Date(newDate.year, newDate.month, newDate.date));
  };

  return (
    <div className="mt-2 flex flex-col sm:flex-row">
      <div className="sm:w-[20%] truncate pt-3 sm:text-right">Ngày sinh</div>
      <div className="flex justify-between sm:pl-5 sm:w-[80%]  flex-wrap">
        {/* Select Ngày */}
        <select
          name="date"
          value={date.date}
          onChange={handleChange}
          className="h-9 w-[32%] rounded-sm border border-black/10 px-3 cursor-pointer hover:border-orange outline-none"
        >
          <option value="" disabled hidden>
            Ngày
          </option>
          {range(1, 32).map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>

        {/* Select Tháng */}
        <select
          name="month"
          value={date.month}
          onChange={handleChange}
          className="h-9 w-[32%] rounded-sm border border-black/10 px-3 cursor-pointer hover:border-orange outline-none"
        >
          <option value="" disabled hidden>
            Tháng
          </option>
          {range(0, 12).map((item) => (
            <option value={item} key={item}>
              Tháng {item + 1}
            </option>
          ))}
        </select>

        {/* Select Năm */}
        <select
          name="year"
          value={date.year}
          onChange={handleChange}
          className="h-9 w-[32%] rounded-sm border border-black/10 px-3 cursor-pointer hover:border-orange outline-none"
        >
          <option value="" disabled hidden>
            Năm
          </option>
          {range(new Date().getFullYear(), new Date().getFullYear() - 100, -1).map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>
        <div className="mt-1 text-red-600 min-h-[1.25rem] text-sm">{errorMessage}</div>
      </div>
    </div>
  );
}
