import { Pipe, PipeTransform } from '@angular/core';
import { GenericQuestion } from '../courses/service/course-detail.service';

@Pipe({
  name: 'filterQuestionsPipe'
})
export class FilterQuestionsPipePipe implements PipeTransform {

  transform(value: GenericQuestion[], filterBy: string, selectedTags: string[]): GenericQuestion[] {
    if (selectedTags.length === 0) {
      return value.filter(q => q.questionText.includes(filterBy))
    }

    return value
            .filter(q => q.tags.map(tag => tag.name).some(r=> selectedTags.indexOf(r) >= 0)) // filter for tags
            .filter(q => q.questionText.includes(filterBy)) // filter for word
  }

}
