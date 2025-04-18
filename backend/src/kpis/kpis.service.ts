import { Injectable } from '@nestjs/common';
import { CreateKpiDto } from './dto/create-kpi.dto';
import { UpdateKpiDto } from './dto/update-kpi.dto';
import { Kpi, kpis } from 'src/common/db';

@Injectable()
export class KpisService {
  private readonly kpis = kpis
  
  // create
  /* create(createKpiDto: CreateKpiDto) {
    const id = createKpiDto.name.toLowerCase().replace(/\s+/g, '-')
    if (this.kpis[id]) {
      throw new Error('KPI with this generated ID already exists')
    }
    
    const created: Kpi = {
      id,
      ...createKpiDto,
    }
    
    this.kpis[id] = created
    return created
  } */

  findAll() {
    return this.kpis
  }

  findOne(id: Kpi['id']) {
    return this.kpis[id]
  }

  update(id: Kpi['id'], updateKpiDto: UpdateKpiDto) {
    const updated = Object.assign(this.kpis[id], updateKpiDto)
    return updated
  }

  remove(id: Kpi['id']) {
    delete this.kpis[id]
    return this.kpis
  }
  
}
