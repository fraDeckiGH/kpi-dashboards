import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { KpisService } from './kpis.service'
import { CreateKpiDto } from './dto/create-kpi.dto'
import { UpdateKpiDto } from './dto/update-kpi.dto'
import { Kpi } from 'src/common/db'

@Controller('kpis')
export class KpisController {
  constructor(private readonly kpisService: KpisService) {}

  // create
  /* @Post()
  create(@Body() createKpiDto: CreateKpiDto) {
    return this.kpisService.create(createKpiDto)
  } */

  @Get()
  findAll() {
    return this.kpisService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: Kpi['id']) {
    return this.kpisService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: Kpi['id'], @Body() updateKpiDto: UpdateKpiDto) {
    console.log(`kpi patch`, updateKpiDto)
    return this.kpisService.update(id, updateKpiDto)
  }

  @Delete(':id')
  remove(@Param('id') id: Kpi['id']) {
    return this.kpisService.remove(id)
  }
  
}
