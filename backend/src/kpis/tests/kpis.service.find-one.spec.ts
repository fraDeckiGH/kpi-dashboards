import { 
  Test, 
  TestingModule, 
} from '@nestjs/testing'
import { 
  GoneException, 
  NotFoundException,
  UnprocessableEntityException, 
} from '@nestjs/common'
import { KpisService } from 'src/kpis/kpis.service'
import { 
  Kpi as Entity, 
} from 'src/common/db'

describe(`KpisService`, () => {
  let service: typeof mockService
  
  /** leaner/lighter vers. of Entity */
  type Mock = Partial< Omit<Entity, 
      | "id"
      | "status"
    >> 
    & Pick<Entity, "id">
    & Partial<{
      status: 
        & Pick<Entity["status"], "current"> 
        & Partial< 
          Pick<Entity["status"], "lastUpdate"> 
        >
    }>
  ;
  type Mocks<T extends Mock = Mock> = Record<Entity["id"], T>
  
  let mocks: Mocks = {}
  const serviceMethod: KpisService["findOne"] = jest.fn()
  
  const mockService = {
    entitys: mocks,
    findOne: serviceMethod,
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
  

  describe(`findOne`, () => {
    const activeId: Entity["id"] = 'active-id'
    const disabledId: Entity["id"] = 'disabled-id'
    const notFoundId: Entity["id"] = 'non-found-id'
    const unprocessableId: Entity["id"] = 'unprocessable-id'
    
    const mockActive: Mock = {
      id: activeId,
      status: { current: 'active', },
    }
    const mockDisabled: Mock = {
      id: disabledId,
      status: { current: 'disabled', },
    }
    const mockUnprocessable: Mock = {
      id: unprocessableId,
    }
    
    
    // beforeEach(() => {})

    
    it(`should return the record if it is found`, () => {
      service.entitys[activeId] = mockActive
      
      const result = service.findOne(activeId)
      expect(result).toEqual(mockActive)
    })

    it(`should throw appropriately if record is not found`, () => {
      expect(() => service.findOne(notFoundId))
        .toThrow(NotFoundException)
    })
    
    it(`should throw appropriately if record doesn't match current schema`, () => {
      service.entitys[unprocessableId] = mockUnprocessable
      
      expect(() => service.findOne(unprocessableId))
        .toThrow(UnprocessableEntityException)
    })

    it(`should throw appropriately if record is disabled`, () => {
      service.entitys[disabledId] = mockDisabled
      
      expect(() => service.findOne(disabledId))
        .toThrow(GoneException)
    })
    
  })
  
})
