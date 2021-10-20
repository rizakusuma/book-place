import React, { useState, Fragment, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Down from "../../assets/icon/chevron-down.svg";
import { Wrapper, PlaceholderText, Options, Input } from "./style";
import Loader from '../Loader/index';

function useActive() {
  const [active, setActive] = useState(false);
  const toggleActive = () => setActive((val) => !val);

  return { active, toggleActive, setActive };
}

function useSelect({ toggleActive, onChange }) {
  const [selected, setSelected] = useState(null);

  function onClickData(data, setAutocomplete = () => {}) {
    return (e) => {
      e.stopPropagation();
      toggleActive();

      setSelected(data);
      onChange(data);
      setAutocomplete(data.name);
    };
  }

  return { selected, onClickData, setSelected };
}

function useAutocomplete({ defaultValue }) {
  const [value, setValue] = useState(defaultValue || "");

  function onInputChange(e) {
    setValue(e.target.value);
  }

  return { value, setValue, onInputChange };
}

function setupPosition({ heightList, statusSelect, refEle }) {
  if (!statusSelect) {
    const ele = refEle.current;
    const getOffsetTop = ele.getBoundingClientRect().top + document.body.scrollTop;
    const getHeightHTML = document.documentElement.offsetHeight;
    const getHeightSelect = ele.offsetHeight;

    if (getHeightHTML - getOffsetTop - getHeightSelect < heightList) {
      ele.style.top = "auto";
      ele.style.bottom = "80%";
    } else ele.removeAttribute("style");
  }
}

function useOutsideClick({ ref, callback }) {
  useEffect(() => {
    function handleMouseDown(e) {
      if (ref.current && !ref.current.contains(e.target)) callback();
    }

    window.addEventListener("mousedown", handleMouseDown);
    return () => window.removeEventListener("mousedown", handleMouseDown);
  }, [callback, ref]);
}

function Select({
  heightList = 180,
  placeholder,
  defaultSelected,
  isLoading,
  options = [],
  autocomplete,
  width = "auto",
  defaultValue,
  onChange = () => {},
  ...props
}) {
  const { active, toggleActive, setActive } = useActive();
  const select = useSelect({ toggleActive, onChange });
  const autocomp = useAutocomplete({ defaultValue });
  const refEle = useRef();
  const wrapperRef = useRef();

  function onClickSelect() {
    if (!isLoading) {
      setupPosition({ heightList, statusSelect: active, refEle });
      toggleActive();
    }
  }

  useOutsideClick({ ref: wrapperRef, callback: () => setActive(false) });
  return autocomplete ? (
    <Wrapper ref={wrapperRef} active={active} onClick={onClickSelect} width={width}>
      <Fragment>
        <img src={Down} alt="down" />

        <Input
          placeholder={placeholder}
          value={autocomp.value}
          onChange={autocomp.onInputChange}
          {...props}
        />
      </Fragment>
      <Options height={heightList} ref={refEle} active={active}>
        {options.length > 0 &&
          options
            .filter((option) => option.name.toLowerCase().includes(autocomp.value.toLowerCase()))
            .map((option, i) => (
              <Options.Data onClick={select.onClickData(option, autocomp.setValue)} key={i}>
                <h5>{option.name}</h5>
              </Options.Data>
            ))}
      </Options>
    </Wrapper>
  ) : (
    <Wrapper
      ref={wrapperRef}
      isLoading={isLoading}
      active={active}
      onClick={onClickSelect}
      width={width}
    >
      {isLoading ? (
        <Fragment>
          <Loader />
          <PlaceholderText>
            <h5>Loading...</h5>
          </PlaceholderText>
        </Fragment>
      ) : (
        <Fragment>
          <img src={Down} alt="down" />
          {!select.selected && !defaultSelected && (
            <PlaceholderText>
              <h5>{placeholder}</h5>
            </PlaceholderText>
          )}
          {(select.selected || defaultSelected) && (
            <h5>{(select.selected || defaultSelected).name}</h5>
          )}
        </Fragment>
      )}
      <Options height={heightList} ref={refEle} active={active}>
        {options.length > 0 &&
          options.map((option, i) => (
            <Options.Data onClick={select.onClickData(option)} key={i}>
              <h5>{option.name}</h5>
            </Options.Data>
          ))}
      </Options>
    </Wrapper>
  );
}

Select.propTypes = {
  width: PropTypes.string,
  heightList: PropTypes.number,
  placeholder: PropTypes.string,
  isLoading: PropTypes.bool,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
    })
  ).isRequired,
  defaultSelected: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
  autocomplete: PropTypes.bool,
  defaultValue: PropTypes.string,
};

export default Select;
