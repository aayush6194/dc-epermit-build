import React, { useState } from "react";
import { Card, Grid, Loader } from "platyplex_ui";
import { Popover } from "antd";
import { disabledTxtColor2 } from "../../../../config";
import { useSize } from "../../../../hooks/size";
import { usePlaces } from "../../../../hooks/places_v1";
import { useDispatch } from "react-redux";
import { setAddressData } from "../../../../store/actions/search";

const LocationSearcher = () => {
  const { container, width } = useSize();
  const { searchText, addressData, loading, setSearchText } = usePlaces(
    "",
    false
  );
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  const handleChange = ({ target }: any) => {
    setSearchText(target.value);
    setVisible(true);
  };

  return (
    <Popover
      visible={visible}
      placement="bottom"
      content={
        loading ? (
          <Grid
            style={{ minWidth: 500, maxWidth: "90vw" }}
            customCols="1fr auto auto 1fr"
          >
            <span />
            <span>
              <Loader.Spinner />
            </span>
            Loading
          </Grid>
        ) : (
          <Grid
            placeItems="center stretch"
            customCols="1fr auto"
            style={{ width }}
          >
            <div
              className="pointer noselect"
              onClick={() => {
                if (addressData.formattedAddress !== "No Result Found") {
                  setSearchText(addressData.formattedAddress);
                  dispatch(setAddressData(addressData));
                }
                setVisible(false);
              }}
            >
              {addressData.formattedAddress}
            </div>
            <i
              className="fa fa-times-circle pointer txt-md"
              onClick={() => setVisible(false)}
            />
          </Grid>
        )
      }
    >
      <Card margin="0" grid placeItems="center stretch">
        <input
          ref={container}
          placeholder="Where to? "
          style={{
            width: "100%",
            background: disabledTxtColor2,
            borderRadius: "1.5em",
            padding: ".5em 20px",
            border: "1px solid " + disabledTxtColor2,
          }}
          onChange={handleChange}
          value={searchText}
        />
      </Card>
    </Popover>
  );
};

export default LocationSearcher;
