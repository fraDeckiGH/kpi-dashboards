import { 
  ConflictException, 
  GoneException, 
  Injectable, 
  NotFoundException,
} from '@nestjs/common'
import { CreateKpiDto } from 'src/kpis/dto/create-kpi.dto'
import { UpdateKpiDto } from 'src/kpis/dto/update-kpi.dto'
import { 
  Kpi as Entity, 
  Kpis as Entitys, // purposefully called 'Entitys' instead of 'Entities'
  kpis, 
} from 'src/common/db'
import { FindAllQueryKpiDto } from 'src/kpis/dto/find-all-query-kpi.dto'
import { pick, sortByField } from 'src/common/utils'
import { FindAllReturnKpiDto } from 'src/kpis/dto/find-all-return-kpi.dto'
import { plainToInstance } from 'class-transformer'

@Injectable()
export class KpisService {
  /** purposefully called 'entitys' instead of 'entities' */
  private readonly entitys = kpis
  
  // ? methods sorted alphabetically
  
  create(createDto: CreateKpiDto) {
    const id = createDto.name.toLowerCase().replace(/\s+/g, '-')
    const entity = this.entitys[id]
    
    if (entity) {
      switch (entity.status.current) {
        case 'active': {
          throw new ConflictException(`Record with ID '${id}' already exists`)
          break
        }
        case 'disabled': {
          throw new ConflictException(`Record with ID '${id}' already exists and is ${entity.status.current}`)
          break
        }
      }
    }
    
    const created: Entity = {
      id, 
      status: {
        current: 'active',
        lastUpdate: new Date().toISOString(),
      }, 
      selectedVisual: createDto.recommendedVisual, 
      ...createDto, 
    }
    
    this.entitys[id] = created
    return created
  }
  
  /** soft delete */
  disable(id: Entity['id']) {
    const entity = this.entitys[id]
    
    if (!entity) {
      throw new NotFoundException(`Record with ID '${id}' not found`)
    }
    switch (entity.status.current) {
      case 'disabled': {
        throw new ConflictException(`Record with ID '${id}' is ${entity.status.current} already`)
        break
      }
    }
    
    entity.status.current = 'disabled'
    entity.status.lastUpdate = new Date().toISOString()
    return entity
  }
  
  findAll(query: FindAllQueryKpiDto) {
    const { filter, limit, skip, sort } = query
    
    // * obj{} -> array[]
    const allItems = Object.values(this.entitys)
    
    // * filter out disabled records
    const nonDisabledItems = allItems.filter(entity => entity.status.current !== 'disabled')
    
    // * [sort]
    const sortedItems = !sort ? nonDisabledItems : sortByField(nonDisabledItems, sort)
    
    // * pagination
    const paginatedItems = sortedItems.slice(skip, skip + limit)
    
    // * [filter record's fields]
    type LeanKpi = { id: Entity['id'] } & Partial<Omit<Entity, 'id'>>
    const leanItems: LeanKpi[] = !filter/* ?.length */
      ? paginatedItems
      : paginatedItems.map(item => ({ id: item.id, ...pick(item, filter) }))
    ;
    
    // * array[] -> obj{}
    const data = leanItems.reduce((acc: Entitys, entity) => {
      /* tbs: serialization takes place -> manual class instantiation
        https://docs.nestjs.com/techniques/serialization#exclude-properties
        https://docs.nestjs.com/techniques/serialization#transform-plain-objects
        */
      acc[entity.id] = plainToInstance(Entity, entity)
      return acc
    }, {})
    
    // * return
    const ret: FindAllReturnKpiDto = {
      data,
      dataLength: leanItems.length,
      pageCurrent: Math.floor(skip / limit)/*  + 1 */,
      pagesLength: Math.ceil(leanItems.length / limit),
    }
    return ret
  }
  
  findOne(id: Entity['id']) {
    const entity = this.entitys[id]
    
    if (!entity) {
      throw new NotFoundException(`Record with ID '${id}' not found`)
    }
    switch (entity.status.current) {
      case 'disabled': {
        throw new GoneException(`Record with ID '${id}' is ${entity.status.current}`)
        break
      }
    }
    
    return entity
  }
  
  /** hard delete */
  remove(id: Entity['id']) {
    if (!this.entitys[id]) {
      throw new NotFoundException(`Record with ID '${id}' not found`)
    }
    const entity = structuredClone(this.entitys[id])
    delete this.entitys[id]
    
    return entity
  }
  
  restore(id: Entity['id']) {
    const entity = this.entitys[id]
    
    if (!entity) {
      throw new NotFoundException(`Record with ID '${id}' not found`)
    }
    switch (entity.status.current) {
      case 'active': {
        throw new ConflictException(`Record with ID '${id}' is ${entity.status.current}`)
        break
      }
      case 'restored': {
        throw new ConflictException(`Record with ID '${id}' was already ${entity.status.current}`)
        break
      }
    }
    
    entity.status.current = 'restored'
    entity.status.lastUpdate = new Date().toISOString()
    return entity
  }
  
  update(id: Entity['id'], updateDto: UpdateKpiDto) {
    const entity = this.entitys[id]
    
    if (!entity) {
      throw new NotFoundException(`Record with ID '${id}' not found`)
    }
    switch (entity.status.current) {
      case 'disabled': {
        throw new GoneException(`Record with ID '${id}' is ${entity.status.current}`)
        break
      }
    }
    
    const updated = Object.assign(entity, updateDto)
    updated.lastUpdate = new Date().toISOString()
    
    return updated
  }
  
}
