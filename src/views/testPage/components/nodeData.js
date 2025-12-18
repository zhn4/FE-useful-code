const nodeData = [
  {
    shape: 'edge',
    attrs: {
      line: {
        stroke: '#2590FF',
        strokeWidth: 4,
        targetMarker: {
          name: 'block',
          width: 6,
          height: 12,
        },
      },
    },
    id: '1f6a1d0b-97d5-4975-8f9a-953e7a43baa9',
    zIndex: 0,
    source: {
      cell: 'ea66a8dd-d39d-4b42-a046-6e3a6a5d2795',
      port: '3430b1ff-999b-4d1f-a6ca-05c0a33fa295',
    },
    target: {
      cell: '683f38e0-a031-439f-a891-7205f2e54e7e',
      port: '0c5a4205-2220-4f1e-9828-e552e9be9100',
    },
  },
  {
    shape: 'edge',
    attrs: {
      line: {
        stroke: '#6584A4',
        strokeWidth: 1,
        targetMarker: null,
      },
    },
    id: 'd5c3b58e-d8a2-403d-aa7f-d861533a9172',
    zIndex: 0,
    source: {
      cell: '683f38e0-a031-439f-a891-7205f2e54e7e',
      port: 'c6d7e2c1-46df-4d95-93b7-d0b834f35fa8',
    },
    target: {
      cell: '4a9d3356-f67d-4dd2-ae36-b277f9359782',
      port: '2a1957c8-1d02-4f02-96a9-875159145fa2',
    },
  },
  {
    shape: 'edge',
    attrs: {
      line: {
        stroke: '#6584A4',
        strokeWidth: 1,
        targetMarker: null,
      },
    },
    id: '6de009d3-508d-4f97-82ec-fec6b9c58aed',
    zIndex: 0,
    source: {
      cell: '683f38e0-a031-439f-a891-7205f2e54e7e',
      port: 'c6d7e2c1-46df-4d95-93b7-d0b834f35fa8',
    },
    target: {
      cell: '83a0854c-0d58-423d-8a06-8c8c88f37aef',
      port: '2a1957c8-1d02-4f02-96a9-875159145fa2',
    },
  },
  {
    shape: 'edge',
    attrs: {
      line: {
        stroke: '#6584A4',
        targetMarker: null,
      },
    },
    id: '3ad81336-ebf4-44fa-b5fa-33f3ea15e3cc',
    zIndex: 0,
    source: {
      cell: '683f38e0-a031-439f-a891-7205f2e54e7e',
      port: 'b8204a81-0f19-48ea-a755-355cdb821aa5',
    },
    target: {
      cell: 'da4cf430-a587-4d9a-8613-69c337d18576',
      port: 'cff5788c-be48-4dda-9b4e-14f8a833ec1b',
    },
  },
  {
    shape: 'edge',
    attrs: {
      line: {
        stroke: '#6584A4',
        targetMarker: null,
      },
    },
    id: 'e5906fe9-b33b-44bc-ae82-0eab4954d0a4',
    zIndex: 0,
    source: {
      cell: 'da4cf430-a587-4d9a-8613-69c337d18576',
      port: '3cdab478-8879-43b5-949f-ccbde83ee50c',
    },
    target: {
      cell: '97fbe8db-466b-4dbc-af0f-8f1f4e5897d9',
      port: 'cff5788c-be48-4dda-9b4e-14f8a833ec1b',
    },
  },
  {
    shape: 'edge',
    attrs: {
      line: {
        stroke: '#6584A4',
        targetMarker: null,
      },
    },
    id: 'f3d687d5-57ba-42f6-b443-e274d5a6f239',
    zIndex: 0,
    source: {
      cell: '97fbe8db-466b-4dbc-af0f-8f1f4e5897d9',
      port: '3cdab478-8879-43b5-949f-ccbde83ee50c',
    },
    target: {
      cell: '6c7e4de7-f5b3-4fc1-9923-c173d975403f',
      port: 'cff5788c-be48-4dda-9b4e-14f8a833ec1b',
    },
  },
  {
    shape: 'edge',
    attrs: {
      line: {
        stroke: '#2590FF',
        strokeWidth: 4,
        targetMarker: {
          name: 'block',
          width: 6,
          height: 12,
        },
      },
    },
    id: '4d3e695b-fdff-480e-bdaf-dc28c3c1e6fa',
    zIndex: 0,
    source: {
      cell: '6c7e4de7-f5b3-4fc1-9923-c173d975403f',
      port: '3cdab478-8879-43b5-949f-ccbde83ee50c',
    },
    target: {
      cell: '6476077f-d572-4152-819e-eba52af8eaa2',
      port: 'ea476888-73e8-4261-a5c3-f29bd7ad7bba',
    },
  },
  {
    shape: 'edge',
    attrs: {
      line: {
        stroke: '#6584A4',
        strokeWidth: 1,
        targetMarker: null,
      },
    },
    id: '855f3ebc-de96-4f2c-a014-9e00b94a06a1',
    zIndex: 0,
    source: {
      cell: 'da4cf430-a587-4d9a-8613-69c337d18576',
      port: '7c7c0e54-2ed3-427e-b047-5413daeab52b',
    },
    target: {
      cell: '4a2f4487-e8aa-4f3f-a1ff-bf31e3a41c42',
      port: '2a1957c8-1d02-4f02-96a9-875159145fa2',
    },
  },
  {
    shape: 'edge',
    attrs: {
      line: {
        stroke: '#6584A4',
        strokeWidth: 1,
        targetMarker: null,
      },
    },
    id: '1732436a-5af5-4ad0-acfb-cc787fc5d730',
    zIndex: 0,
    source: {
      cell: 'da4cf430-a587-4d9a-8613-69c337d18576',
      port: '7c7c0e54-2ed3-427e-b047-5413daeab52b',
    },
    target: {
      cell: 'd3fdf9fb-b76c-4785-af63-f91064eb84da',
      port: '2a1957c8-1d02-4f02-96a9-875159145fa2',
    },
  },
  {
    shape: 'edge',
    attrs: {
      line: {
        stroke: '#6584A4',
        strokeWidth: 1,
        targetMarker: null,
      },
    },
    id: 'c85b3282-9ee7-4245-8936-9ca1e7a9508e',
    zIndex: 0,
    source: {
      cell: '97fbe8db-466b-4dbc-af0f-8f1f4e5897d9',
      port: '7c7c0e54-2ed3-427e-b047-5413daeab52b',
    },
    target: {
      cell: '0c4b9bdd-e1ea-488c-b899-e89cb71976cf',
      port: '2a1957c8-1d02-4f02-96a9-875159145fa2',
    },
  },
  {
    shape: 'edge',
    attrs: {
      line: {
        stroke: '#6584A4',
        strokeWidth: 1,
        targetMarker: null,
      },
    },
    id: '06e9c6ed-c5a4-44b0-a4b1-a755a2227124',
    zIndex: 0,
    source: {
      cell: '97fbe8db-466b-4dbc-af0f-8f1f4e5897d9',
      port: '7c7c0e54-2ed3-427e-b047-5413daeab52b',
    },
    target: {
      cell: '45a7b1dc-a72e-49a8-b960-03f80b9ecee7',
      port: '2a1957c8-1d02-4f02-96a9-875159145fa2',
    },
  },
  {
    position: {
      x: 360,
      y: 360,
    },
    size: {
      width: 120,
      height: 40,
    },
    attrs: {
      text: {
        text: '方形节点',
      },
    },
    visible: true,
    shape: 'custom-rect',
    ports: {
      groups: {
        top: {
          position: 'top',
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: '#5F95FF',
              strokeWidth: 1,
              fill: '#fff',
              style: {
                visibility: 'hidden',
              },
            },
          },
        },
        right: {
          position: 'right',
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: '#5F95FF',
              strokeWidth: 1,
              fill: '#fff',
              style: {
                visibility: 'hidden',
              },
            },
          },
        },
        bottom: {
          position: 'bottom',
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: '#5F95FF',
              strokeWidth: 1,
              fill: '#fff',
              style: {
                visibility: 'hidden',
              },
            },
          },
        },
        left: {
          position: 'left',
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: '#5F95FF',
              strokeWidth: 1,
              fill: '#fff',
              style: {
                visibility: 'hidden',
              },
            },
          },
        },
      },
      items: [
        {
          group: 'top',
          id: 'd805d5bf-38ad-47bf-b0ba-696aea9b878d',
        },
        {
          group: 'right',
          id: 'b8204a81-0f19-48ea-a755-355cdb821aa5',
        },
        {
          group: 'bottom',
          id: 'c6d7e2c1-46df-4d95-93b7-d0b834f35fa8',
        },
        {
          group: 'left',
          id: '0c5a4205-2220-4f1e-9828-e552e9be9100',
        },
      ],
    },
    id: '683f38e0-a031-439f-a891-7205f2e54e7e',
    zIndex: 1,
  },
  {
    position: {
      x: 120,
      y: 320,
    },
    size: {
      width: 120,
      height: 120,
    },
    attrs: {
      text: {
        text: '圆形节点',
      },
    },
    visible: true,
    shape: 'custom-circle',
    ports: {
      groups: {
        top: {
          position: 'top',
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: '#5F95FF',
              strokeWidth: 1,
              fill: '#fff',
              style: {
                visibility: 'hidden',
              },
            },
          },
        },
        right: {
          position: 'right',
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: '#5F95FF',
              strokeWidth: 1,
              fill: '#fff',
              style: {
                visibility: 'hidden',
              },
            },
          },
        },
        bottom: {
          position: 'bottom',
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: '#5F95FF',
              strokeWidth: 1,
              fill: '#fff',
              style: {
                visibility: 'hidden',
              },
            },
          },
        },
        left: {
          position: 'left',
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: '#5F95FF',
              strokeWidth: 1,
              fill: '#fff',
              style: {
                visibility: 'hidden',
              },
            },
          },
        },
      },
      items: [
        {
          group: 'top',
          id: 'cc254dfe-f567-4121-a08d-4dec526810fe',
        },
        {
          group: 'right',
          id: '3430b1ff-999b-4d1f-a6ca-05c0a33fa295',
        },
        {
          group: 'bottom',
          id: 'd1aa0170-5f23-4a70-98dc-e6e7d5c69ef5',
        },
        {
          group: 'left',
          id: 'a40dc411-6b47-442a-89ee-1e2a9feb0ca2',
        },
      ],
    },
    id: 'ea66a8dd-d39d-4b42-a046-6e3a6a5d2795',
    zIndex: 2,
  },
  {
    position: {
      x: 439,
      y: 440,
    },
    size: {
      width: 128,
      height: 20,
    },
    attrs: {
      text: {
        text: '方形细长节点',
      },
    },
    visible: true,
    shape: 'custom-rect-small',
    ports: {
      groups: {
        top: {
          position: 'top',
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: '#5F95FF',
              strokeWidth: 1,
              fill: '#fff',
              style: {
                visibility: 'hidden',
              },
            },
          },
        },
        right: {
          position: 'right',
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: '#5F95FF',
              strokeWidth: 1,
              fill: '#fff',
              style: {
                visibility: 'hidden',
              },
            },
          },
        },
        bottom: {
          position: 'bottom',
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: '#5F95FF',
              strokeWidth: 1,
              fill: '#fff',
              style: {
                visibility: 'hidden',
              },
            },
          },
        },
        left: {
          position: 'left',
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: '#5F95FF',
              strokeWidth: 1,
              fill: '#fff',
              style: {
                visibility: 'hidden',
              },
            },
          },
        },
      },
      items: [
        {
          group: 'top',
          id: 'fdf620f9-a4c7-4e60-87a0-4fa177d323a1',
        },
        {
          group: 'right',
          id: '5c2367de-bbb0-4f67-ae5a-77787b6b17b8',
        },
        {
          group: 'bottom',
          id: '16bf566f-5113-4d08-b6d4-824677748774',
        },
        {
          group: 'left',
          id: '2a1957c8-1d02-4f02-96a9-875159145fa2',
        },
      ],
    },
    id: '4a9d3356-f67d-4dd2-ae36-b277f9359782',
    zIndex: 3,
  },
  {
    position: {
      x: 439,
      y: 491,
    },
    size: {
      width: 128,
      height: 20,
    },
    attrs: {
      text: {
        text: '方形细长节点',
      },
    },
    visible: true,
    shape: 'custom-rect-small',
    ports: {
      groups: {
        top: {
          position: 'top',
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: '#5F95FF',
              strokeWidth: 1,
              fill: '#fff',
              style: {
                visibility: 'hidden',
              },
            },
          },
        },
        right: {
          position: 'right',
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: '#5F95FF',
              strokeWidth: 1,
              fill: '#fff',
              style: {
                visibility: 'hidden',
              },
            },
          },
        },
        bottom: {
          position: 'bottom',
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: '#5F95FF',
              strokeWidth: 1,
              fill: '#fff',
              style: {
                visibility: 'hidden',
              },
            },
          },
        },
        left: {
          position: 'left',
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: '#5F95FF',
              strokeWidth: 1,
              fill: '#fff',
              style: {
                visibility: 'hidden',
              },
            },
          },
        },
      },
      items: [
        {
          group: 'top',
          id: 'fdf620f9-a4c7-4e60-87a0-4fa177d323a1',
        },
        {
          group: 'right',
          id: '5c2367de-bbb0-4f67-ae5a-77787b6b17b8',
        },
        {
          group: 'bottom',
          id: '16bf566f-5113-4d08-b6d4-824677748774',
        },
        {
          group: 'left',
          id: '2a1957c8-1d02-4f02-96a9-875159145fa2',
        },
      ],
    },
    id: '83a0854c-0d58-423d-8a06-8c8c88f37aef',
    zIndex: 4,
  },
  {
    position: {
      x: 654,
      y: 360,
    },
    size: {
      width: 120,
      height: 40,
    },
    attrs: {
      text: {
        text: '方形节点',
      },
    },
    visible: true,
    shape: 'custom-rect',
    ports: {
      groups: {
        top: {
          position: 'top',
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: '#5F95FF',
              strokeWidth: 1,
              fill: '#fff',
              style: {
                visibility: 'hidden',
              },
            },
          },
        },
        right: {
          position: 'right',
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: '#5F95FF',
              strokeWidth: 1,
              fill: '#fff',
              style: {
                visibility: 'hidden',
              },
            },
          },
        },
        bottom: {
          position: 'bottom',
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: '#5F95FF',
              strokeWidth: 1,
              fill: '#fff',
              style: {
                visibility: 'hidden',
              },
            },
          },
        },
        left: {
          position: 'left',
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: '#5F95FF',
              strokeWidth: 1,
              fill: '#fff',
              style: {
                visibility: 'hidden',
              },
            },
          },
        },
      },
      items: [
        {
          group: 'top',
          id: '339a78f1-76bd-436b-a624-c55f7fbd72f3',
        },
        {
          group: 'right',
          id: '3cdab478-8879-43b5-949f-ccbde83ee50c',
        },
        {
          group: 'bottom',
          id: '7c7c0e54-2ed3-427e-b047-5413daeab52b',
        },
        {
          group: 'left',
          id: 'cff5788c-be48-4dda-9b4e-14f8a833ec1b',
        },
      ],
    },
    id: 'da4cf430-a587-4d9a-8613-69c337d18576',
    zIndex: 5,
  },
  {
    position: {
      x: 1016,
      y: 360,
    },
    size: {
      width: 120,
      height: 40,
    },
    attrs: {
      text: {
        text: '方形节点',
      },
    },
    visible: true,
    shape: 'custom-rect',
    ports: {
      groups: {
        top: {
          position: 'top',
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: '#5F95FF',
              strokeWidth: 1,
              fill: '#fff',
              style: {
                visibility: 'hidden',
              },
            },
          },
        },
        right: {
          position: 'right',
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: '#5F95FF',
              strokeWidth: 1,
              fill: '#fff',
              style: {
                visibility: 'hidden',
              },
            },
          },
        },
        bottom: {
          position: 'bottom',
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: '#5F95FF',
              strokeWidth: 1,
              fill: '#fff',
              style: {
                visibility: 'hidden',
              },
            },
          },
        },
        left: {
          position: 'left',
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: '#5F95FF',
              strokeWidth: 1,
              fill: '#fff',
              style: {
                visibility: 'hidden',
              },
            },
          },
        },
      },
      items: [
        {
          group: 'top',
          id: '339a78f1-76bd-436b-a624-c55f7fbd72f3',
        },
        {
          group: 'right',
          id: '3cdab478-8879-43b5-949f-ccbde83ee50c',
        },
        {
          group: 'bottom',
          id: '7c7c0e54-2ed3-427e-b047-5413daeab52b',
        },
        {
          group: 'left',
          id: 'cff5788c-be48-4dda-9b4e-14f8a833ec1b',
        },
      ],
    },
    id: '97fbe8db-466b-4dbc-af0f-8f1f4e5897d9',
    zIndex: 6,
  },
  {
    position: {
      x: 1317,
      y: 360,
    },
    size: {
      width: 120,
      height: 40,
    },
    attrs: {
      text: {
        text: '方形节点',
      },
    },
    visible: true,
    shape: 'custom-rect',
    ports: {
      groups: {
        top: {
          position: 'top',
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: '#5F95FF',
              strokeWidth: 1,
              fill: '#fff',
              style: {
                visibility: 'hidden',
              },
            },
          },
        },
        right: {
          position: 'right',
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: '#5F95FF',
              strokeWidth: 1,
              fill: '#fff',
              style: {
                visibility: 'hidden',
              },
            },
          },
        },
        bottom: {
          position: 'bottom',
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: '#5F95FF',
              strokeWidth: 1,
              fill: '#fff',
              style: {
                visibility: 'hidden',
              },
            },
          },
        },
        left: {
          position: 'left',
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: '#5F95FF',
              strokeWidth: 1,
              fill: '#fff',
              style: {
                visibility: 'hidden',
              },
            },
          },
        },
      },
      items: [
        {
          group: 'top',
          id: '339a78f1-76bd-436b-a624-c55f7fbd72f3',
        },
        {
          group: 'right',
          id: '3cdab478-8879-43b5-949f-ccbde83ee50c',
        },
        {
          group: 'bottom',
          id: '7c7c0e54-2ed3-427e-b047-5413daeab52b',
        },
        {
          group: 'left',
          id: 'cff5788c-be48-4dda-9b4e-14f8a833ec1b',
        },
      ],
    },
    id: '6c7e4de7-f5b3-4fc1-9923-c173d975403f',
    zIndex: 7,
  },
  {
    position: {
      x: 1723,
      y: 360,
    },
    size: {
      width: 120,
      height: 40,
    },
    attrs: {
      text: {
        text: '方形节点',
      },
    },
    visible: true,
    shape: 'custom-rect',
    ports: {
      groups: {
        top: {
          position: 'top',
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: '#5F95FF',
              strokeWidth: 1,
              fill: '#fff',
              style: {
                visibility: 'hidden',
              },
            },
          },
        },
        right: {
          position: 'right',
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: '#5F95FF',
              strokeWidth: 1,
              fill: '#fff',
              style: {
                visibility: 'hidden',
              },
            },
          },
        },
        bottom: {
          position: 'bottom',
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: '#5F95FF',
              strokeWidth: 1,
              fill: '#fff',
              style: {
                visibility: 'hidden',
              },
            },
          },
        },
        left: {
          position: 'left',
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: '#5F95FF',
              strokeWidth: 1,
              fill: '#fff',
              style: {
                visibility: 'hidden',
              },
            },
          },
        },
      },
      items: [
        {
          group: 'top',
          id: 'f3fa8376-5942-44aa-a692-aa35ff2f1980',
        },
        {
          group: 'right',
          id: 'a1da46e7-041a-4a36-9b30-ab1b0f14e693',
        },
        {
          group: 'bottom',
          id: 'f71b1612-49e3-471d-88e7-b52162b9e376',
        },
        {
          group: 'left',
          id: 'ea476888-73e8-4261-a5c3-f29bd7ad7bba',
        },
      ],
    },
    id: '6476077f-d572-4152-819e-eba52af8eaa2',
    zIndex: 8,
  },
  {
    position: {
      x: 731,
      y: 442,
    },
    size: {
      width: 128,
      height: 20,
    },
    attrs: {
      text: {
        text: '方形细长节点',
      },
    },
    visible: true,
    shape: 'custom-rect-small',
    ports: {
      groups: {
        top: {
          position: 'top',
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: '#5F95FF',
              strokeWidth: 1,
              fill: '#fff',
              style: {
                visibility: 'hidden',
              },
            },
          },
        },
        right: {
          position: 'right',
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: '#5F95FF',
              strokeWidth: 1,
              fill: '#fff',
              style: {
                visibility: 'hidden',
              },
            },
          },
        },
        bottom: {
          position: 'bottom',
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: '#5F95FF',
              strokeWidth: 1,
              fill: '#fff',
              style: {
                visibility: 'hidden',
              },
            },
          },
        },
        left: {
          position: 'left',
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: '#5F95FF',
              strokeWidth: 1,
              fill: '#fff',
              style: {
                visibility: 'hidden',
              },
            },
          },
        },
      },
      items: [
        {
          group: 'top',
          id: 'fdf620f9-a4c7-4e60-87a0-4fa177d323a1',
        },
        {
          group: 'right',
          id: '5c2367de-bbb0-4f67-ae5a-77787b6b17b8',
        },
        {
          group: 'bottom',
          id: '16bf566f-5113-4d08-b6d4-824677748774',
        },
        {
          group: 'left',
          id: '2a1957c8-1d02-4f02-96a9-875159145fa2',
        },
      ],
    },
    id: '4a2f4487-e8aa-4f3f-a1ff-bf31e3a41c42',
    zIndex: 11,
  },
  {
    position: {
      x: 731,
      y: 493,
    },
    size: {
      width: 128,
      height: 20,
    },
    attrs: {
      text: {
        text: '方形细长节点',
      },
    },
    visible: true,
    shape: 'custom-rect-small',
    ports: {
      groups: {
        top: {
          position: 'top',
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: '#5F95FF',
              strokeWidth: 1,
              fill: '#fff',
              style: {
                visibility: 'hidden',
              },
            },
          },
        },
        right: {
          position: 'right',
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: '#5F95FF',
              strokeWidth: 1,
              fill: '#fff',
              style: {
                visibility: 'hidden',
              },
            },
          },
        },
        bottom: {
          position: 'bottom',
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: '#5F95FF',
              strokeWidth: 1,
              fill: '#fff',
              style: {
                visibility: 'hidden',
              },
            },
          },
        },
        left: {
          position: 'left',
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: '#5F95FF',
              strokeWidth: 1,
              fill: '#fff',
              style: {
                visibility: 'hidden',
              },
            },
          },
        },
      },
      items: [
        {
          group: 'top',
          id: 'fdf620f9-a4c7-4e60-87a0-4fa177d323a1',
        },
        {
          group: 'right',
          id: '5c2367de-bbb0-4f67-ae5a-77787b6b17b8',
        },
        {
          group: 'bottom',
          id: '16bf566f-5113-4d08-b6d4-824677748774',
        },
        {
          group: 'left',
          id: '2a1957c8-1d02-4f02-96a9-875159145fa2',
        },
      ],
    },
    id: 'd3fdf9fb-b76c-4785-af63-f91064eb84da',
    zIndex: 12,
  },
  {
    position: {
      x: 1093,
      y: 440,
    },
    size: {
      width: 128,
      height: 20,
    },
    attrs: {
      text: {
        text: '方形细长节点',
      },
    },
    visible: true,
    shape: 'custom-rect-small',
    ports: {
      groups: {
        top: {
          position: 'top',
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: '#5F95FF',
              strokeWidth: 1,
              fill: '#fff',
              style: {
                visibility: 'hidden',
              },
            },
          },
        },
        right: {
          position: 'right',
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: '#5F95FF',
              strokeWidth: 1,
              fill: '#fff',
              style: {
                visibility: 'hidden',
              },
            },
          },
        },
        bottom: {
          position: 'bottom',
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: '#5F95FF',
              strokeWidth: 1,
              fill: '#fff',
              style: {
                visibility: 'hidden',
              },
            },
          },
        },
        left: {
          position: 'left',
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: '#5F95FF',
              strokeWidth: 1,
              fill: '#fff',
              style: {
                visibility: 'hidden',
              },
            },
          },
        },
      },
      items: [
        {
          group: 'top',
          id: 'fdf620f9-a4c7-4e60-87a0-4fa177d323a1',
        },
        {
          group: 'right',
          id: '5c2367de-bbb0-4f67-ae5a-77787b6b17b8',
        },
        {
          group: 'bottom',
          id: '16bf566f-5113-4d08-b6d4-824677748774',
        },
        {
          group: 'left',
          id: '2a1957c8-1d02-4f02-96a9-875159145fa2',
        },
      ],
    },
    id: '0c4b9bdd-e1ea-488c-b899-e89cb71976cf',
    zIndex: 13,
  },
  {
    position: {
      x: 1093,
      y: 491,
    },
    size: {
      width: 128,
      height: 20,
    },
    attrs: {
      text: {
        text: '方形细长节点',
      },
    },
    visible: true,
    shape: 'custom-rect-small',
    ports: {
      groups: {
        top: {
          position: 'top',
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: '#5F95FF',
              strokeWidth: 1,
              fill: '#fff',
              style: {
                visibility: 'hidden',
              },
            },
          },
        },
        right: {
          position: 'right',
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: '#5F95FF',
              strokeWidth: 1,
              fill: '#fff',
              style: {
                visibility: 'hidden',
              },
            },
          },
        },
        bottom: {
          position: 'bottom',
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: '#5F95FF',
              strokeWidth: 1,
              fill: '#fff',
              style: {
                visibility: 'hidden',
              },
            },
          },
        },
        left: {
          position: 'left',
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: '#5F95FF',
              strokeWidth: 1,
              fill: '#fff',
              style: {
                visibility: 'hidden',
              },
            },
          },
        },
      },
      items: [
        {
          group: 'top',
          id: 'fdf620f9-a4c7-4e60-87a0-4fa177d323a1',
        },
        {
          group: 'right',
          id: '5c2367de-bbb0-4f67-ae5a-77787b6b17b8',
        },
        {
          group: 'bottom',
          id: '16bf566f-5113-4d08-b6d4-824677748774',
        },
        {
          group: 'left',
          id: '2a1957c8-1d02-4f02-96a9-875159145fa2',
        },
      ],
    },
    id: '45a7b1dc-a72e-49a8-b960-03f80b9ecee7',
    zIndex: 14,
  },
]

export default nodeData
