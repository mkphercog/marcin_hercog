<script setup lang="ts">
import { AboutSection, ExperienceSection, ProgrammingSection } from '@/components'
import { BaseDivider, BaseIcon, BaseSection } from '@/components/ui'

import { SOCIALS } from '@/constants'
</script>

<template>
  <div>
    <AboutSection />
    <BaseDivider />
    <ProgrammingSection />
    <ExperienceSection />
    <BaseSection title="Social links" hideDivider>
      <ul class="linksWrapper">
        <BaseIcon
          v-for="{ id, icon, name, link } in SOCIALS"
          :key="id"
          :src="icon"
          :alt="name"
          :link="link"
        />
      </ul>
    </BaseSection>
  </div>
</template>

<style scoped>
div {
  padding: 0 30px;
}

.linksWrapper {
  display: flex;
  gap: 50px;
  justify-content: center;
  margin-bottom: 40px;
}
</style>
