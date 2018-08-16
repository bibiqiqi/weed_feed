/*jshint esversion: 6*/
const testDataOne =
{
   shortId: "4ZZWOM",
   name: "Tangerine Dream",
   startDate: "2018-05-20",
   endDate: "2018-07-20",
   strain: "indica",
   entries: [
      {
         shortId: "MBZIJ3",
         number: 1,
         date: "2018-05-20",
         week: 1,
         phaseProgress: {
            phase: "vegetative",
            phaseStartDate: "2018-05-20",
            week: 1,
            stage: "seedling"
         },
         wasWatered: true,
         wasFed: false,
         nutrients: {
            floraMicro: "0",
            floraGrow: "0",
            floraBloom: "0",
            caliMagic: "0"
         },
         notes: "Lorem ipsum dolor sit amet, facer laoreet definiebas te pro. Vis cu recusabo gubergren dissentias, ea est natum facilisis, vis."
      },
      {
         shortId: "BYDU0O",
         number: 2,
         date: "2018-05-23",
         week: 1,
         phaseProgress: {
            phase: "vegetative",
            phaseStartDate: "2018-05-20",
            week: 1,
            stage: "seedling"
         },
         wasWatered: false,
         wasFed: true,
         nutrients: {
            floraMicro: "1/4 tsp",
            floraGrow: "1/8 tsp",
            floraBloom: "1/8 tsp",
            caliMagic: "1 tsp"
         },
         notes: ""
      },
      {
         shortId: "9NLTW7",
         number: 3,
         date: "2018-05-28",
         week: 2,
         phaseProgress: {
            phase: "vegetative",
            phaseStartDate: "2018-05-20",
            week: 2,
            stage: "vegetative"
         },
         wasWatered: true,
         wasFed: false,
         nutrients: {
            floraMicro: "0",
            floraGrow: "0",
            floraBloom: "0",
            caliMagic: "0"
         },
         notes: "Lorem ipsum dolor sit amet, labitur."
      },
      {
         shortId: "YUTAUU",
         number: 4,
         date: "2018-06-01",
         week: 2,
         phaseProgress: {
            phase: "vegetative",
            phaseStartDate: "2018-05-20",
            week: 2,
            stage: "vegetative"
         },
         wasWatered: false,
         wasFed: true,
         nutrients: {
            floraMicro: "1/2 tsp",
            floraGrow: "1/2 tsp",
            floraBloom: "1/4 tsp",
            caliMagic: "1 tsp"
         },
         notes: ""
      },
      {
         shortId: "GGMU8D",
         number: 5,
         date: "2018-06-06",
         week: 3,
         phaseProgress: {
            phase: "flowering",
            phaseStartDate: "2018-06-06",
            week: 1,
            stage: "early bloom"
         },
         wasWatered: true,
         wasFed: false,
         nutrients: {
            floraMicro: "0",
            floraGrow: "0",
            floraBloom: "0",
            caliMagic: "0"
         },
         notes: ""
      },
      {
         shortId: "WQNFZN",
         number: 6,
         date: "2018-06-12",
         week: 4,
         phaseProgress: {
            phase: "flowering",
            phaseStartDate: "2018-06-06",
            week: 1,
            stage: "early bloom"
         },
         wasWatered: false,
         wasFed: true,
         nutrients: {
            floraMicro: "1/2 tsp",
            floraGrow: "1/4 tsp",
            floraBloom: "1/2 tsp",
            caliMagic: "1/2 tsp"
         },
         notes: ""
      },
      {
         shortId: "OQ06AZ",
         number: 7,
         date: "2018-06-21",
         week: 5,
         phaseProgress: {
            phase: "flowering",
            phaseStartDate: "2018-06-06",
            week: 3,
            stage: "peak bloom"
         },
         wasWatered: true,
         wasFed: false,
         nutrients: {
            floraMicro: "0",
            floraGrow: "0",
            floraBloom: "0",
            caliMagic: "0"
         },
         notes: ""
      },
      {
         shortId: "BRM4QL",
         number: 8,
         date: "2018-06-30",
         week: 6,
         phaseProgress: {
            phase: "flowering",
            phaseStartDate: "2018-06-06",
            week: 4,
            stage: "late bloom"
         },
         wasWatered: false,
         wasFed: true,
         nutrients: {
            floraMicro: "1/2 tsp",
            floraGrow: "0 tsp",
            floraBloom: "3/4 tsp",
            caliMagic: "1/2 tsp"
         },
         notes: ""
      },
      {
         shortId: "XKUCFV",
         number: 9,
         date: "2018-07-05",
         week: 7,
         phaseProgress: {
            phase: "flowering",
            phaseStartDate: "2018-06-06",
            week: 5,
            stage: "late bloom"
         },
         wasWatered: true,
         wasFed: false,
         nutrients: {
            floraMicro: "0",
            floraGrow: "0",
            floraBloom: "0",
            caliMagic: "0"
         },
         notes: ""
      },
      {
         shortId: "MGE6XY",
         number: 10,
         date: "2018-07-10",
         week: 8,
         phaseProgress: {
            phase: "flowering",
            phaseStartDate: "2018-06-06",
            week: 5,
            stage: "flush"
         },
         wasWatered: true,
         wasFed: false,
         nutrients: {
            floraMicro: "0",
            floraGrow: "0",
            floraBloom: "0",
            caliMagic: "0"
         },
         notes: ""
      }
   ]
};

const testDataTwo =
{
  shortId: "QLMYDF",
  name: "Acapulco Gold",
  startDate: "2018-05-20",
  endDate: null,
  strain: "indica",
  entries: [
    {
      shortId: "P53X47",
      number: 1,
      date: "2018-05-20",
      week: 1,
      phaseProgress: {
        phase: "vegetative",
        phaseStartDate: "2018-05-20",
        week: 1,
        stage: "seedling"
        },
      wasWatered: true,
      wasFed: false,
      nutrients: {
        floraMicro: "0",
        floraGrow: "0",
        floraBloom: "0",
        caliMagic: "0"
      },
      notes: "Lorem ipsum dolor sit amet, facer laoreet definiebas te pro. Vis cu recusabo gubergren dissentias, ea est natum facilisis, vis."
    },
    {
      shortId: "7LA72O",
      number: 2,
      date: "2018-05-23",
      week: 1,
      phaseProgress: {
        phase: "vegetative",
        phaseStartDate: "2018-05-20",
        week: 1,
        stage: "seedling"
        },
      wasWatered: false,
      wasFed: true,
      nutrients: {
          floraMicro: "1/4 tsp",
          floraGrow: "1/8 tsp",
          floraBloom: "1/8 tsp",
          caliMagic: "1 tsp"
      },
      notes: ""
    }
  ]
};

const nutrientSchedule =
{
	name: "coco coir",
	schedule: [
		{
			phase: "vegetative",
			stage: "before sprout",
			nutrients:
				{
					floraMicro: "0",
					floraGrow: "0",
					floraBloom: "0",
					caliMagic: "1 tsp"
				}
		},
		{
			phase: "vegetative",
			stage: "seedling",
			nutrients:
				{
					floraMicro: "1/4 tsp",
					floraGrow: "1/8 tsp",
					floraBloom: "1/8 tsp",
					caliMagic: "1 tsp"
				}
		},
		{
			phase: "vegetative",
			stage: "vegetative",
			nutrients:
				{
					floraMicro: "1/2 tsp",
					floraGrow: "1/2 tsp",
					floraBloom: "1/4 tsp",
					caliMagic: "1 tsp"
				}
		},
		{
			phase: "flowering",
			stage: "early bloom",
			nutrients:
				{
					floraMicro: "1/2 tsp",
					floraGrow: "1/4 tsp",
					floraBloom: "1/2 tsp",
					caliMagic: "1/2 tsp"
				}
		},
		{
			phase: "flowering",
			stage: "peak bloom",
			nutrients:
				{
					floraMicro: "1/2 tsp",
					floraGrow: "1/8 tsp",
					floraBloom: "1/2 tsp",
					caliMagic: "1/2 tsp"
				}
		},
		{
			phase: "flowering",
			stage: "late bloom",
			nutrients:
				{
					floraMicro: "1/2 tsp",
					floraGrow: "0 tsp",
					floraBloom: "3/4 tsp",
					caliMagic: "1/2 tsp"
				}
		},
		{
			phase: "flowering",
			stage: "flush",
			nutrients:
				{
					floraMicro: "1/2 tsp",
					floraGrow: "0 tsp",
					floraBloom: "3/4 tsp",
					caliMagic: "1/2 tsp"
				}
		}
	]
};

module.exports = {testDataOne, testDataTwo, nutrientSchedule};
