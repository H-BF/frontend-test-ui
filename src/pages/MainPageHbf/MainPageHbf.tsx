import React, { FC, useState } from 'react'
import { BaseTemplate } from 'templates'
import { DefaultLayout, LaunchesBlock, Spacer, LaunchesFiltersBlock } from 'components'
import { TFilter } from 'localTypes/LaunchesBlock'

export const MainPageHbf: FC = () => {
  const [currentFilters, setCurrentFilters] = useState<TFilter | undefined>()

  return (
    <BaseTemplate>
      <DefaultLayout.FlexContainer>
        <DefaultLayout.FullWidthContainer>
          <DefaultLayout.ScrollableUnderHeaderContainer>
            <DefaultLayout.ContentContainer>
              <LaunchesFiltersBlock onFilterChange={setCurrentFilters} />
              <Spacer />
              <LaunchesBlock filters={currentFilters} type="hbf" />
            </DefaultLayout.ContentContainer>
          </DefaultLayout.ScrollableUnderHeaderContainer>
        </DefaultLayout.FullWidthContainer>
      </DefaultLayout.FlexContainer>
    </BaseTemplate>
  )
}
