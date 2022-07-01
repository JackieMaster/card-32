import React, { useState } from "react";
import styled from "styled-components";
import FlexContainer from "../../atoms/box/FlexContainer";
import Modal from "../../atoms/modal/Modal";
import { PlayerCard } from "../playerCard";
import { useThemeContext } from "../../../contexts/ThemeProvider";

const SidebarContainer = styled.div`
  width: 320px;
  @media (max-width: 1024px) {
    width: 230px;
  }
  @media (max-width: 640px) {
    width: 100%;
  }
`;

const TinyText = styled.p`
  font-size: 10px;
  font-weight: 400;
`;

const StyledSelect = styled.select`
  /* for Firefox */
  -moz-appearance: none;
  /* for Chrome */
  -webkit-appearance: none;
  /* For IE10 */
  select::-ms-expand {
    display: none;
  }
`;

const Sidebar: React.FC = () => {
  const { sidebarOrder, setSidebarOrder } = useThemeContext();
  const [bidModalVisible, setBidModalVisible] = useState(false);
  return (
    <SidebarContainer
      className={`h-full bg-zinc-800 relative order-${sidebarOrder}`}
    >
      <FlexContainer className="justify-between bg-zinc-700 px-2 shadow">
        <FlexContainer className="my-1 sm:my-2 gap-2">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full shadow">
            <img
              src="https://picsum.photos/200"
              alt="user"
              className="w-full h-full rounded-full border-2 border-blue-500"
            />
          </div>
          <div>
            <p className="text-sm sm:text-lg sm:leading-6 font-bold">shihab</p>
            <p className="text-xs">don&apos;t freeze</p>
          </div>
        </FlexContainer>
        <FlexContainer className="gap-1">
          <button
            className="hidden sm:block btn-primary"
            onClick={() =>
              setSidebarOrder(
                sidebarOrder === 1 ? 2 : sidebarOrder === 2 ? 1 : 1
              )
            }
          >
            <i className="fa-solid fa-table-cells-large"></i>
          </button>
          <button className="block sm:hidden btn-primary">
            <i className="fa-solid fa-message"></i>
          </button>
          <button className="btn-primary">
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
          </button>
        </FlexContainer>
      </FlexContainer>

      <div className="hidden sm:block mt-20">
        <FlexContainer className="flex-col justify-center gap-2">
          <FlexContainer>
            <div className="flex flex-col">
              <TinyText className="text-gray-400 -mb-1.5">Room ID</TinyText>
              <p className="text-lg select-all font-semibold text-ellipsis text-center">
                discord#970
              </p>
            </div>
          </FlexContainer>
          <FlexContainer className="text-xs justify-center font-thin gap-2">
            <i className="fa-solid fa-users"></i>
            <p className="text-xs">4/4</p>
          </FlexContainer>
        </FlexContainer>

        {/* player cards */}
        <FlexContainer className="justify-center my-4 mt-8">
          <div className="inline-grid grid-cols-2 grid-rows-2 gap-4">
            <PlayerCard name="shihab" />
            <PlayerCard name="ovy" />
            <PlayerCard name="antor" />
            <PlayerCard name="zawad" />
          </div>
        </FlexContainer>
      </div>

      {/* mobile view */}
      <div className="block sm:hidden p-2 py-3">
        <FlexContainer className="justify-between gap-2">
          <div className="flex flex-col">
            <TinyText className="text-gray-400 -mb-1.5">Room ID</TinyText>
            <p className="text-lg select-all font-semibold text-ellipsis text-center">
              discord#970
            </p>
          </div>
          <FlexContainer className="gap-2">
            <button className="btn-primary p-1 text-xs border-2 border-blue-600 shadow-blue-600">
              Start Game
            </button>
            <button className="btn-primary p-1 text-xs border-2 border-purple-600 shadow-purple-600">
              Restart
            </button>
          </FlexContainer>
        </FlexContainer>
        <div className="mt-3 inline-grid grid-cols-4 grid-rows-1 gap-2">
          <PlayerCard name="shihab" />
          <PlayerCard name="ovy" />
          <PlayerCard name="antor" />
          <PlayerCard name="zawad" />
        </div>
      </div>

      {/* sidebar bottom content */}
      <div className="hidden sm:flex w-full absolute bottom-0 p-2 flex-col gap-2">
        <FlexContainer className="gap-2 justify-center">
          <button className="btn-primary border-2 border-blue-600 shadow-blue-600">
            Start Game
          </button>
          <button className="btn-primary border-2 border-purple-600 shadow-purple-600">
            Restart
          </button>
        </FlexContainer>
      </div>

      {/* bid select modal */}
      <Modal visible={bidModalVisible} setVisible={setBidModalVisible}>
        <FlexContainer className="p-5 bg-zinc-900 text-white  flex-col gap-2">
          <p className="text-xl font-bold">Select your bid point</p>
          <StyledSelect className="my-3 w-20 h-20 bg-zinc-800 shadow-md border-2 border-blue-700 border-dotted rounded py-1.5 text-center outline-none cursor-pointer focus:ring-2 ring-blue-700 text-2xl">
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={7}>7</option>
            <option value={8}>8</option>
          </StyledSelect>
          <button className="btn-primary  bg-blue-700 text-xs py-2 px-3">
            Bid
          </button>
        </FlexContainer>
      </Modal>
    </SidebarContainer>
  );
};

export default Sidebar;