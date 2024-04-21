import { useEffect, useState } from 'react';
import data from "../../data/currency.json";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { ChildProps } from '../../types/type';

interface CountryType {
  name: string;
  code: string;
  symbol: string;
  flag?: string;
}


export default function CountrySelect({ sendDataToParent, selectFrom, selectTo }: ChildProps) {
  const [countries, setCountries] = useState<CountryType[]>([]);

console.log(selectFrom, selectTo);


  useEffect(() => {
    let countryData: CountryType[] = [];
    data.forEach(el => {
      let obj: CountryType = {
        code: el.currency.code,
        name: el.currency.name,
        symbol: el.currency.symbol,
        flag: el.flag
      };
      countryData.push(obj);
    });
    setCountries(countryData);
  }, []);

  const handleAutocompleteChange = (_: React.ChangeEvent<{}>, value: CountryType | null) => {
    sendDataToParent(value);
    
  };

  return (
    <Autocomplete
      id="country-select-demo"
      sx={{ width: 319, height: 49 }}
      options={countries}
      getOptionLabel={option => option.name}
      onChange={handleAutocompleteChange}
      renderOption={(props, option) => (
        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
          <img
            loading="lazy"
            width="20"
            src={option.flag}
            alt=""
          />
          {option.code} - {option.name}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
            value={selectFrom}
          {...params}
          placeholder="Choose country..."
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
}
