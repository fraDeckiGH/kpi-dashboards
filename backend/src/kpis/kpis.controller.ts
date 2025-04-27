import { 
	Controller, 
	Get, 
	Post, 
	Body, 
	Patch, 
	Param, 
	Delete, 
	Query,
  UseInterceptors,
  ClassSerializerInterceptor,
  SerializeOptions, 
} from '@nestjs/common'
import { KpisService } from 'src/kpis/kpis.service'
import { CreateKpiDto } from 'src/kpis/dto/create-kpi.dto'
import { UpdateKpiDto } from 'src/kpis/dto/update-kpi.dto'
import { FindAllQueryKpiDto } from 'src/kpis/dto/find-all-query-kpi.dto'
import { Kpi as Entity } from 'src/common/db'
import { FindAllReturnKpiDto } from 'src/kpis/dto/find-all-return-kpi.dto'

@UseInterceptors(ClassSerializerInterceptor)
@SerializeOptions({ type: Entity })
@Controller('kpis')
export class KpisController {
  constructor(private readonly kpisService: KpisService) {}
  
  // ? methods sorted by route

  @Post()
  create(@Body() createKpiDto: CreateKpiDto): Entity {
    return this.kpisService.create(createKpiDto)
  }

  @SerializeOptions({ type: FindAllReturnKpiDto })
  @Get()
  findAll(@Query() query: FindAllQueryKpiDto): FindAllReturnKpiDto {
    return this.kpisService.findAll(query)
  }
  
  @Get(':id')
  findOne(@Param('id') id: Entity['id']): Entity {
    return this.kpisService.findOne(id)
  }
  
  @Delete(':id')
  remove(@Param('id') id: Entity['id']): Entity {
    return this.kpisService.remove(id)
  }

  @Patch(':id')
  update(@Param('id') id: Entity['id'], @Body() updateKpiDto: UpdateKpiDto): Entity {
    console.log(`kpi patch`, updateKpiDto)
    return this.kpisService.update(id, updateKpiDto)
  }

  @Patch(':id/disable')
  disable(@Param('id') id: Entity['id']): Entity {
    return this.kpisService.disable(id)
  }
  
  @Patch(':id/restore')
  restore(@Param('id') id: Entity['id']): Entity {
    return this.kpisService.restore(id)
  }
  
}
