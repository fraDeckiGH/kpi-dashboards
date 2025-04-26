import { 
	IsOptional, 
	ValidateNested, 
	IsIn, 
} from 'class-validator'
import { Type } from 'class-transformer'
import { PartialType, PickType } from '@nestjs/mapped-types'
import { Visual, visualTypes } from 'src/visuals/db/types'
import { Sentiment } from 'src/assets/entities/asset.entity'
import { AtLeastOneField } from 'src/common/validators'

class UpdateSentimentDto extends PartialType(
  PickType(Sentiment, ['favorite'] as const)
) {}

@AtLeastOneField([ 'selectedVisual', 'sentiment.favorite' ], {
	message: 'Either [selectedVisual, sentiment.favorite] must be supplied',
})
export class UpdateKpiDto/*  extends PartialType(CreateKpiDto) */ {
	@IsOptional()
	@IsIn(visualTypes)
	selectedVisual?: Visual

	@IsOptional()
	@ValidateNested()
	@Type(() => UpdateSentimentDto)
	sentiment?: UpdateSentimentDto
}
