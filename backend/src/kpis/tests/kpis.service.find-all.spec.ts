import { 
  Test, 
  TestingModule, 
} from '@nestjs/testing'
import { KpisService } from 'src/kpis/kpis.service'
import { 
  FindAllQueryKpiDto, 
  Kpi as Entity, 
} from 'src/common/db'
import { Sort } from 'src/common/dto'

describe(`KpisService`, () => {
  let service: typeof mockService
  
  /** leaner/lighter vers. of Entity */
  type Mock = Partial< Omit<Entity, 
      | "id"
      | "addressedQuestions"
      | "status"
    >> 
    & Pick<Entity, "id">
    & Partial<{
      addressedQuestions: (Partial< Entity["addressedQuestions"][number] >)[]
      status: 
        & Pick<Entity["status"], "current"> 
        & Partial< 
          Pick<Entity["status"], "lastUpdate"> 
        >
    }>
  ;
  type Mocks<T extends Mock = Mock> = Record<Entity["id"], T>
  
  let mocks: Mocks = {}
  const serviceMethod: KpisService["findAll"] = jest.fn()
  
  const mockService = {
    entitys: mocks,
    findAll: serviceMethod,
  }

  
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        KpisService, 
      ],
    }).compile()
    
    service = module.get(KpisService)
  })

  it(`should be defined`, () => {
    expect(service).toBeDefined()
  })

  
  describe(`findAll`, () => {
    
    // beforeEach(() => {})
    
    
    describe(`disabled items`, () => {
      const mocks: Mocks = {
        "id_01": {
          id: 'id_01',
          status: { current: 'active', },
        }, 
        "id_02": {
          id: 'id_02',
          status: { current: 'disabled', },
        }, 
      }
      
      it(`should not return disabled items`, () => {
        // * arrange
        service.entitys = mocks
  
        // * act
        const query = new FindAllQueryKpiDto()
        query.limit = 5
        // console.log(`query`, query)
        const result = service.findAll(query)
        // console.log(`result.data`, result.data)
        
        
        // * assert
        const results = Object.values(result.data)
        
        // ** 1
        results.forEach((item) => {
          expect(item.status?.current).not.toBe('disabled')
        })
        
        // ** 2 -- not doable, `status` is  not returned / under `@Exclude`
        // const statuses = results.map((item) => item.status?.current)
        // expect(statuses).toEqual([ 'active' ])
        
        // ** 3
        const nonDisabledCount = Object
          .values(service.entitys)
          .filter((item) => 
            item.status?.current !== 'disabled'
          ).length
        expect(result.dataTotalLength).toBe(
          Math.min(nonDisabledCount, query.limit)
        )
      })
      
    })
    
    
    describe(`'filter' query param`, () => {
      const mocks: Mocks = {
        "id_01": {
          id: "id_01",
          addressedQuestions: [
            { question: "question_01", explShort: "explShort_01" }, 
          ],
          desc: "desc_01",
          name: "name_01",
          status: { current: "active", },
        }, 
      }
      
      it(`can filter-in specified (simple) fields`, () => {
        // * arrange
        service.entitys = mocks
  
        // * act
        const query = new FindAllQueryKpiDto()
        query.filter = [ "name" ]
        // console.log(`query`, query)
        const result = service.findAll(query)
  
        // * assert
        Object.values(result.data).forEach((item) => {
          expect(item).toMatchObject({ 
            id: item.id, 
            name: item.name, 
          })
        })
      })
      
      it(`can filter-in "nested.fields"`, () => {
        // * arrange
        service.entitys = mocks
  
        // * act
        const query = new FindAllQueryKpiDto()
        query.filter = [ "addressedQuestions.question" ]
        // console.log(`query`, query)
        const result = service.findAll(query)
  
        // * assert
        Object.values(result.data).forEach((item) => {
          expect(item).toMatchObject({ 
            id: item.id, 
            addressedQuestions: item.addressedQuestions.map((aq) => (
              { question: aq.question, }
            )),
          })
        })
      })
      
      it(`can filter-out every filterable field`, () => {
        // * arrange
        service.entitys = mocks
  
        // * act
        const query = new FindAllQueryKpiDto()
        query.filter = []
        // console.log(`query`, query)
        const result = service.findAll(query)
  
        // * assert
        Object.values(result.data).forEach((item) => {
          expect(item).toMatchObject({ id: item.id })
        })
      })
      
    })
    
    
    describe(`pagination`, () => {
      const dataTotalLength = 15
      const mocks: Mocks = {}
      
      for (let i = 0; i < dataTotalLength; i++) {
        const id = `id_${(i + 1).toString().padStart(2, '0')}`
        mocks[id] = {
          id,
          status: { current: 'active', },
        }
      }
      
      
      it(`total No. of records`, () => {
        // * arrange
        service.entitys = mocks

        // * act
        const query = new FindAllQueryKpiDto()
        // query.skip = 0
        // query.limit = 5
        
        // console.log(`query`, query)
        const result = service.findAll(query)
        // console.log(`result`, result)
        
        // * assert
        expect(result.dataTotalLength).toBe(dataTotalLength)
      })
      
      
      it(`first page: total No. of records > limit`, () => {
        // * arrange
        service.entitys = mocks

        // * act
        const query = new FindAllQueryKpiDto()
        query.skip = 0
        query.limit = 5
        
        // console.log(`query`, query)
        const result = service.findAll(query)
        // console.log(`result`, result)
        
        // * assert
        expect(result.dataTotalLength).toBe(dataTotalLength)
        expect(result.pageCurrent).toBeLessThan(result.pagesLength)
        expect(result.pagesLength).toBe(3)
        expect(Object.keys(result.data)).toEqual([
          "id_01", "id_02", "id_03", "id_04", "id_05",
        ])
      })
      
      it(`first page: total records No. < limit`, () => {
        // * arrange
        service.entitys = mocks

        // * act
        const query = new FindAllQueryKpiDto()
        query.skip = 0
        query.limit = 20
        
        // console.log(`query`, query)
        const result = service.findAll(query)
        // console.log(`result`, result)
        
        // * assert
        expect(result.pageCurrent).toBe(result.pagesLength)
        expect(result.pagesLength).toBe(1)
      })
      
      
      it(`in-between page: skip > limit`, () => {
        // * arrange
        service.entitys = mocks

        // * act
        const query = new FindAllQueryKpiDto()
        query.skip = 7
        query.limit = 4
        
        // console.log(`query`, query)
        const result = service.findAll(query)
        // console.log(`result`, result)
        
        // * assert
        expect(result.pageCurrent).toBeLessThan(result.pagesLength)
        expect(result.pageCurrent).toBe(3)
        expect(result.pagesLength).toBe(4)
        expect(Object.keys(result.data)).toEqual([
          "id_08", "id_09", "id_10", "id_11",
        ])
      })
      
      it(`in-between page: skip < limit`, () => {
        // * arrange
        service.entitys = mocks

        // * act
        const query = new FindAllQueryKpiDto()
        query.skip = 4
        query.limit = 7
        
        // console.log(`query`, query)
        const result = service.findAll(query)
        // console.log(`result`, result)
        
        // * assert
        expect(result.pageCurrent).toBeLessThan(result.pagesLength)
        expect(result.pageCurrent).toBe(2)
        expect(result.pagesLength).toBe(3)
        expect(Object.keys(result.data)).toEqual([
          "id_05", "id_06", "id_07", "id_08", "id_09", "id_10", "id_11",
        ])
      })
      
      
      it(`last page: complete`, () => {
        // * arrange
        service.entitys = mocks

        // * act
        const query = new FindAllQueryKpiDto()
        query.skip = 10
        query.limit = 5
        
        // console.log(`query`, query)
        const result = service.findAll(query)
        // console.log(`result`, result)
        
        // * assert
        expect(result.pageCurrent).toBe(result.pagesLength)
        expect(Object.keys(result.data)).toEqual([
          "id_11", "id_12", "id_13", "id_14", "id_15",
        ])
      })
      
      it(`last page: incomplete`, () => {
        // * arrange
        service.entitys = mocks

        // * act
        const query = new FindAllQueryKpiDto()
        query.skip = 12
        query.limit = 5
        
        // console.log(`query`, query)
        const result = service.findAll(query)
        // console.log(`result`, result)
        
        // * assert
        expect(result.pageCurrent).toBe(result.pagesLength)
        expect(Object.keys(result.data)).toEqual([
          "id_13", "id_14", "id_15",
        ])
      })
      
      
      it(`beyond last page`, () => {
        // * arrange
        service.entitys = mocks

        // * act
        const query = new FindAllQueryKpiDto()
        query.skip = 16
        query.limit = 5
        
        // console.log(`query`, query)
        const result = service.findAll(query)
        // console.log(`result`, result)
        
        // * assert
        expect(result.pageCurrent).toBeGreaterThan(result.pagesLength)
        expect(result.pagesLength).toBe(3)
        expect(Object.keys(result.data)).toEqual([])
      })
      
    })
    
    
    describe(`sort`, () => {
      const mocks: Mocks = {
        "id_01": {
          id: "id_01",
          addressedQuestions: [
            { question: "question_01", explShort: "explShort_01" }, 
          ],
          desc: "desc_01",
          status: { current: "active", },
        }, 
        "id_02": {
          id: "id_02",
          addressedQuestions: [
            { question: "question_02", explShort: "explShort_02" }, 
          ],
          desc: "desc_02",
          name: "name_02",
          status: { current: "active", },
        }, 
        "id_03": {
          id: "id_03",
          addressedQuestions: [
            { question: "question_03", explShort: "explShort_03" }, 
          ],
          desc: "desc_03",
          name: undefined,
          status: { current: "active", },
        }, 
        "id_04": {
          id: "id_04",
          addressedQuestions: [
            { question: "question_04", explShort: "explShort_04" }, 
          ],
          desc: "desc_04",
          name: "name_04",
          status: { current: "active", },
        }, 
        "id_05": {
          id: "id_05",
          addressedQuestions: [
            { question: "question_05", explShort: "explShort_05" }, 
          ],
          desc: "desc_05",
          status: { current: "active", },
        }, 
      }
      
      it(`ascending order / a-z`, () => {
        // * arrange
        service.entitys = mocks
  
        // * act
        const query = new FindAllQueryKpiDto()
        query.sort = { 
          field: "name", 
          order: "asc", 
        }
        // console.log(`query`, query)
        const result = service.findAll(query)
        
        // * assert
        const names = Object.values(result.data).map((item) => item.name)
        expect(names).toEqual([
          'name_02', 'name_04', undefined, undefined, undefined, 
        ])
      })
      
      it(`descending order / z-a`, () => {
        // * arrange
        service.entitys = mocks
  
        // * act
        const query = new FindAllQueryKpiDto()
        query.sort = { 
          field: "name", 
          order: "desc", 
        }
        // console.log(`query`, query)
        const result = service.findAll(query)
        
        // * assert
        const names = Object.values(result.data).map((item) => item.name)
        expect(names).toEqual([
          undefined, undefined, undefined, 'name_04', 'name_02', 
        ])
      })
      
      it(`can change sorting pos of nullish values: a-z, nulls first`, () => {
        // * arrange
        service.entitys = mocks
  
        // * act
        const query = new FindAllQueryKpiDto()
        query.sort = { 
          field: "name", 
          order: "asc", 
          nulls: "first", 
        }
        // console.log(`query`, query)
        const result = service.findAll(query)
        
        // * assert
        const names = Object.values(result.data).map((item) => item.name)
        expect(names).toEqual([
          undefined, undefined, undefined, 'name_02', 'name_04', 
        ])
      })
      
      it(`can handle "nested.fields"`, () => {
        // * arrange
        const mocks: Mocks = {
          "id_01": {
            id: "id_01",
            // @ts-ignore
            sentiment: { favorite: true },  a: { b: 4 },
            status: { current: "active", },
          }, 
          "id_02": {
            id: "id_02",
            status: { current: "active", },
          }, 
          "id_03": {
            id: "id_03",
            // @ts-ignore
            sentiment: { favorite: false },  a: { b: -1 },
            status: { current: "active", },
          }, 
        }
        service.entitys = mocks
  
        // * act
        const query = new FindAllQueryKpiDto()
        query.sort = { 
          ...new Sort(), 
          // field: "sentiment.favorite", 
          field: "a.b" as any, 
          // order: "asc", 
        }
        // console.log(`query`, query)
        const result = service.findAll(query)
        
        // * assert
        const names = Object.values(result.data).map(
          // (item) => item.sentiment?.favorite
          (item: any) => item.a?.b
        )
        expect(names).toEqual([
          // false, true, undefined, 
          -1, +4, undefined, 
        ])
      })
      
      it(`no order change if sort field doesnt exist on any item`, () => {
        // * arrange
        service.entitys = mocks
  
        // * act
        const query = new FindAllQueryKpiDto()
        query.sort = { 
          ...new Sort(), 
          field: "QAjk9JareIsI6vXm_udFg" as any, // ? manually gen UID
          // order: "asc", 
        }
        // console.log(`query`, query)
        const result = service.findAll(query)
        
        // * assert
        expect(Object.keys(result.data)).toEqual([
          "id_01", "id_02", "id_03", "id_04", "id_05", 
        ])
      })
      
    })
    
    
    describe(`combined query params`, () => {
      
      it(`disabled items dont break pagination`, () => {
        // * arrange
        const dataTotalLength = 15
        const mocks: Mocks = {}
        
        const isDisabled = (n: number, interval: number) => {
          return ((n / interval === 0) && n !== 0 && n !== dataTotalLength)
        }
        for (let i = 0; i < dataTotalLength; i++) {
          const id = `id_${(i + 1).toString().padStart(2, '0')}`
          mocks[id] = {
            id,
            status: { current: 'active', },
          }
          if (isDisabled(i, 3)) {
            const idEdited = id + "--disabled"
            mocks[idEdited] = {
              id: idEdited,
              status: { current: 'disabled', },
            }
          }
        }
        service.entitys = mocks

        // * act
        const query = new FindAllQueryKpiDto()
        query.skip = 5
        query.limit = 5
        // console.log(`query`, query)
        const result = service.findAll(query)
        // console.log(`result`, result)
        
        // * assert
        expect(result.dataTotalLength).toBe(dataTotalLength)
        expect(result.pageCurrent).toBeLessThan(result.pagesLength)
        expect(result.pageCurrent).toBe(2)
        expect(result.pagesLength).toBe(3)
        expect(Object.keys(result.data)).toEqual([
          "id_06", "id_07", "id_08", "id_09", "id_10",
        ])
      })
  
      it(`no sort if the chosen field was filtered out`, () => {
        // * arrange
        const mocks: Mocks = {
          "id_01": {
            id: "id_01",
            name: "name_01",
            status: { current: "active", },
          }, 
          "id_02": {
            id: "id_02",
            name: "name_02",
            status: { current: "active", },
          }, 
        }
        service.entitys = mocks

        // * act
        const query = new FindAllQueryKpiDto()
        query.filter = [ "name" ]
        query.sort = { 
          ...new Sort(), 
          field: "name",
          // order: "asc", 
        }
        // console.log(`query`, query)
        const result = service.findAll(query)
        // console.log(`result.data`, result.data)
        
        // * assert
        expect(Object.keys(result.data)).toEqual([
          "id_01", "id_02", 
        ])
      })
      
    })
    
  })
  
})
