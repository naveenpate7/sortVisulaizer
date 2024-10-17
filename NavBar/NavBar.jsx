import React, { useState } from "react";
import "./NavBar.css";
import { useContext } from "react";
import { store } from "../App";

const NavBar = () => {
  const [data, setData] = useContext(store);
  const [redColor, setRedColor] = useState([]);
  const [greenColor, setGreenColor] = useState([]);

  const generateNumbers = () => {
    let dummy = [];
    for (let i = 0; i <= 24; i++) {
      dummy.push(Math.floor(Math.random() * 500) + 5);
    }
    setData([...dummy]);
    setGreenColor([]);  // Clear the green colors when generating new numbers
  };

  const getBubbleSort = () => {
    let dummy = [...data];
    const bubbleSorting = async () => {
      for (let i = 0; i < dummy.length - 1; i++) {
        for (let j = 0; j < dummy.length - i - 1; j++) {
          setRedColor([j, j + 1]);
          await new Promise(resolve => setTimeout(resolve, 600));
          if (dummy[j] > dummy[j + 1]) {
            let temp = dummy[j];
            dummy[j] = dummy[j + 1];
            dummy[j + 1] = temp;
            setData([...dummy]);
            await new Promise(resolve => setTimeout(resolve, 600));
          }
          setRedColor([]); // Clear red color after comparison
        }
        setGreenColor(prev => [...prev, dummy.length - i - 1]); // Mark the last sorted element
      }
      setRedColor([]);
    };
    bubbleSorting();
  };

  const getInsertionSort = () => {
    let dummy = [...data];
    const insertionSort = async () => {
      for (let i = 1; i < dummy.length; i++) {
        let key = dummy[i];
        let j = i - 1;

        setRedColor([j + 1, i]);
        await new Promise(resolve => setTimeout(resolve, 600));

        while (j >= 0 && dummy[j] > key) {
          setRedColor([j, j + 1]);
          dummy[j + 1] = dummy[j];
          setData([...dummy]);

          await new Promise(resolve => setTimeout(resolve, 600));
          j = j - 1;
        }

        dummy[j + 1] = key;
        setData([...dummy]);
        setGreenColor(prev => [...prev, i]);
        await new Promise(resolve => setTimeout(resolve, 600));

        setRedColor([]);
      }
      setRedColor([]);
    };
    insertionSort();
  };

  const getSelectionSort = () => {
    let dummy = [...data];
    const selectionSort = async () => {
      for (let i = 0; i < dummy.length - 1; i++) {
        let minIndex = i;
        setRedColor([i]);
        for (let j = i + 1; j < dummy.length; j++) {
          setRedColor([j, minIndex]);
          await new Promise(resolve => setTimeout(resolve, 600));
          if (dummy[j] < dummy[minIndex]) {
            minIndex = j;
          }
        }

        if (minIndex !== i) {
          let temp = dummy[i];
          dummy[i] = dummy[minIndex];
          dummy[minIndex] = temp;
          setData([...dummy]);
          await new Promise(resolve => setTimeout(resolve, 600));
        }
        setGreenColor(prev => [...prev, i]);
        setRedColor([]);
      }
      setGreenColor(prev => [...prev, dummy.length - 1]);
    };
    selectionSort();
  };

  const getQuickSort = () => {
    const quickSort = async (arr, low, high) => {
      if (low < high) {
        let pi = await partition(arr, low, high);
        await quickSort(arr, low, pi - 1);
        await quickSort(arr, pi + 1, high);
      }
      setData([...arr]);
    };

    const partition = async (arr, low, high) => {
      let pivot = arr[high];
      let i = low - 1;

      for (let j = low; j < high; j++) {
        setRedColor([j, high]);
        await new Promise(resolve => setTimeout(resolve, 600));
        if (arr[j] < pivot) {
          i++;
          [arr[i], arr[j]] = [arr[j], arr[i]];
          setData([...arr]);
          await new Promise(resolve => setTimeout(resolve, 600));
        }
      }
      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
      setData([...arr]);
      return i + 1;
    };

    quickSort([...data], 0, data.length - 1);
  };

  const getMergeSort = () => {
    const mergeSort = async (arr) => {
      if (arr.length <= 1) return arr;

      const mid = Math.floor(arr.length / 2);
      const left = await mergeSort(arr.slice(0, mid));
      const right = await mergeSort(arr.slice(mid));

      return await merge(left, right);
    };

    const merge = async (left, right) => {
      const result = [];
      let leftIndex = 0;
      let rightIndex = 0;

      while (leftIndex < left.length && rightIndex < right.length) {
        setRedColor([leftIndex + rightIndex, leftIndex + rightIndex + 1]);
        await new Promise(resolve => setTimeout(resolve, 600));

        if (left[leftIndex] < right[rightIndex]) {
          result.push(left[leftIndex]);
          leftIndex++;
        } else {
          result.push(right[rightIndex]);
          rightIndex++;
        }
      }

      const mergedArray = [...result, ...left.slice(leftIndex), ...right.slice(rightIndex)];
      setData(mergedArray);
      await new Promise(resolve => setTimeout(resolve, 600));

      return mergedArray;
    };

    mergeSort([...data]);
  };

  return (
    <div>
      <div className="navbar">
        <div className="navbar-components">
          <div className="generateButton">
            <button className="generatebtn" onClick={generateNumbers}>
              Generate Button
            </button>
          </div>
          <div className="sortingButtons">
            <button onClick={getBubbleSort}>Bubble</button>
            <button onClick={getInsertionSort}>Insertion</button>
            <button onClick={getSelectionSort}>Selection</button>
            <button onClick={getQuickSort}>Quick</button>
            <button onClick={getMergeSort}>Merge</button>
          </div>
        </div>
      </div>
      <div className="numbers">
        {data.map((num, index) => (
          <div
            key={index}
            className="bar"
            style={{
              height: `${num * 10}px`,
              backgroundColor: redColor.includes(index)
                ? 'red'
                : greenColor.includes(index)
                ? 'green'
                : 'aqua'
            }}
          >
            {num}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NavBar;
