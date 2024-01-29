import React from 'react';
import { MarkerType, Position } from 'reactflow';

export const nodes = [
  {
    id: '1',
    type: 'person',
    data: {
        "Nation": "ҚАЗАҚ",
        "Death_Status": null,
        "Buhgalter": null,
        "StatusPFR": null,
        "Place_of_Birth": "ҚАЗАҚСТАН ТҮРКІСТАН МАҚТААРАЛ АУДАНЫ ЖЕТІСАЙ",
        "Pristavanie": null,
        "Source": "MU",
        "Notarius": null,
        "Name": "ОСМАН",
        "Data_Rozhdenya": "2004-02-05",
        "Propal": null,
        "Autditor": null,
        "PDL": null,
        "SroppedByOrgan": null,
        "id": 793238,
        "Status": null,
        "CHSI": null,
        "StoppedBySud": null,
        "Rozisk": null,
        "Citizenship": "ҚАЗАҚСТАН",
        "Status_Minzdrav": null,
        "FIO": "ОСМАН",
        "IIN": "793238",
        "Doljnik": null,
        "Family": "",
        "Otchestvo": "",
        "DeadlinePassed": null
    },
    // position: { x: 250, y: 0 },
  },
  {
    id: '2',
    data: {
      label: 'Default Node',
    },
    // position: { x: 100, y: 100 },
  },
  {
    id: '3',
    type: 'output',
    data: {
      label: 'Output Node',
    },
    // position: { x: 400, y: 100 },
  },
  {
    id: '4',
    type: 'custom',
    // position: { x: 100, y: 200 },
    data: {
      selects: {
        'handle-0': 'smoothstep',
        'handle-1': 'smoothstep',
      },
    },
  },
  {
    id: '5',
    type: 'output',
    data: {
      label: 'custom style',
    },
    className: 'circle',
    style: {
      background: '#2B6CB0',
      color: 'white',
    },
    // position: { x: 400, y: 200 },
    // sourcePosition: Position.Right,
    // targetPosition: Position.Left,
  },
  {
    id: '6',
    type: 'output',
    style: {
      background: '#63B3ED',
      color: 'white',
      width: 100,
    },
    data: {
      label: 'Node',
    },
    // position: { x: 400, y: 325 },
    // sourcePosition: Position.Right,
    // targetPosition: Position.Left,
  },
];

export const edges = [
  { id: 'e1-2', type: 'smoothstep', source: '1', target: '2', label: 'this is an edge label' },
  { id: 'e1-3', type: 'smoothstep', source: '1', target: '3', animated: true },
  {
    id: 'e4-5',
    source: '4',
    target: '5',
    type: 'smoothstep',
    sourceHandle: 'handle-0',
    data: {
      selectIndex: 0,
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: 'e4-6',
    source: '4',
    target: '6',
    type: 'smoothstep',
    sourceHandle: 'handle-1',
    data: {
      selectIndex: 1,
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
];

