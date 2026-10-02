import { useParams } from 'react-router';
import {
  CAPABILITIES,
  getAdjacentCapabilities,
  getCapability,
  getGroup,
  getRelatedCapabilities,
} from '../../data/capabilities.js';
import { usePageMeta } from '../../hooks/usePageMeta.js';
import CapabilityHero from '../../components/capability/CapabilityHero/CapabilityHero.jsx';
import CapabilityTicker from '../../components/capability/CapabilityTicker/CapabilityTicker.jsx';
import CapabilitySections from '../../components/capability/CapabilitySections/CapabilitySections.jsx';
import CapabilityCallout from '../../components/capability/CapabilityCallout/CapabilityCallout.jsx';
import CapabilityFlow from '../../components/capability/CapabilityFlow/CapabilityFlow.jsx';
import CapabilityStatement from '../../components/capability/CapabilityStatement/CapabilityStatement.jsx';
import CapabilityHighlights from '../../components/capability/CapabilityHighlights/CapabilityHighlights.jsx';
import CapabilityIdealFor from '../../components/capability/CapabilityIdealFor/CapabilityIdealFor.jsx';
import CapabilityPager from '../../components/capability/CapabilityPager/CapabilityPager.jsx';
import CapabilityCta from '../../components/capability/CapabilityCta/CapabilityCta.jsx';
import PixelDivider from '../../components/sections/PixelDivider/PixelDivider.jsx';
import NotFoundPage from '../NotFoundPage/NotFoundPage.jsx';

/**
 * /capabilities/:slug — assembled from src/data/capabilities.js.
 * Optional blocks (callout, flow, statement, highlights, idealFor) render only when the data has them.
 */
export default function CapabilityPage() {
  const { slug } = useParams();
  const capability = getCapability(slug);

  usePageMeta({
    title: capability ? capability.name : 'Page not found',
    description: capability?.summary,
  });

  if (!capability) return <NotFoundPage />;

  const group = getGroup(capability.group);
  const { prev, next } = getAdjacentCapabilities(slug);
  const related = getRelatedCapabilities(capability);

  return (
    <div className="capability-page">
      <CapabilityHero capability={capability} group={group} total={CAPABILITIES.length} />
      <CapabilityTicker sections={capability.sections} />
      <CapabilitySections sections={capability.sections} />
      {capability.callout && <CapabilityCallout callout={capability.callout} />}
      {capability.flow && <CapabilityFlow flow={capability.flow} />}
      {capability.statement && <CapabilityStatement statement={capability.statement} />}
      {capability.highlights && <CapabilityHighlights highlights={capability.highlights} />}
      {capability.idealFor && <CapabilityIdealFor items={capability.idealFor} />}
      <CapabilityPager prev={prev} next={next} related={related} group={group} />
      <CapabilityCta current={capability} />
      <PixelDivider />
    </div>
  );
}
