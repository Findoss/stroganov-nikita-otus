export const data1 = {
  id: 1,
  items: [
    {
      id: 2,
      items: [
        { id: 3 },
        { id: 2, items: [{ id: 3 }, { id: 5 }, { id: 7 }] },
        { id: 2, items: [{ id: 4 }] }
      ]
    },
    {
      id: 2,
      items: [
        { id: 3 },
        { id: 2, items: [{ id: 3 }, { id: 5 }, { id: 7 }] },
        { id: 4 },
        { id: 5 },
        {
          id: 2,
          items: [
            { id: 2, items: [{ id: 4 }] },
            { id: 6 },
            {
              id: 2,
              items: [
                { id: 3 },
                {
                  id: 2,
                  items: [
                    { id: 2, items: [{ id: 4 }] },
                    { id: 6 },
                    { id: 2, items: [{ id: 3 }, { id: 5 }, { id: 7 }] }
                  ]
                },
                ,
                { id: 7 }
              ]
            }
          ]
        },
        { id: 6 },
        { id: 2, items: [{ id: 3 }, { id: 5 }, { id: 7 }] }
      ]
    }
  ]
};

export const data2 = {
  id: 1
};

export const data3 = {
  id: 1,
  items: []
};

export const data4 = {
  id: 1,
  items: [
    {
      id: 1,
      items: []
    }
  ]
};

export const data5 = {
  id: 1,
  items: [
    {
      id: 1
    },
    {
      id: 1
    },
    {
      id: 1
    },
    {
      id: 1
    },
    {
      id: 1
    }
  ]
};
