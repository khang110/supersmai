const formatAddress = (address) => {
  const renderDistrict = (district, city) => {
    if (district.indexOf("Thành phố") != -1) {
      return district.slice(10);
    }
    if (district.indexOf("Quận") != -1 && city.indexOf("Hồ Chí Minh") == -1) {
      return district.slice(5);
    }
    const distritNumber =
      "Quận 1, Quận 2, Quận 3, Quận 4, Quận 5, Quận 6, Quận 7, Quận 8, Quận 9, Quận 10, Quận 11, Quận 12";
    if (
      district.indexOf("Quận") != -1 &&
      city.indexOf("Hồ Chí Minh") != -1 &&
      distritNumber.indexOf(district) != -1
    ) {
      return district;
    }
    if (
      district.indexOf("Quận") != -1 &&
      city.indexOf("Hồ Chí Minh") != -1 &&
      distritNumber.indexOf(district) == -1
    ) {
      return district.slice(5);
    }
    if (district.indexOf("Huyện") != -1) {
      return district.slice(7);
    }
  };

  let add = address.split(",");
  let huyen = "",
    tinh = "";
  if (add[3].indexOf("Thành phố") != -1) {
    tinh = add[3].slice(10);
  } else {
    tinh = add[3].slice(6);
  }
  huyen = renderDistrict(add[2], add[3]);

  let diachi = huyen + ", " + tinh;
  return diachi;
};

export default { formatAddress };
