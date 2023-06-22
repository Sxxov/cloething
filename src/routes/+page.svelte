<script lang="ts">
	import {
		ic_arrow_forward,
		ic_arrow_outward,
		ic_check,
		ic_cruelty_free,
		ic_waving_hand,
	} from 'maic/two_tone';
	import { Button, ButtonVariants } from '@sxxov/sv/button';
	import { Svg } from '@sxxov/sv/svg';
	import img_spring_1 from '../assets/img/misc/1284622.jpg';
	import img_spring_2 from '../assets/img/misc/1284619.jpg';
	import img_spring_3 from '../assets/img/misc/1284620.jpg';
	import img_spring_4 from '../assets/img/misc/1284621.jpg';
	import img_crewmate_1 from '../assets/img/misc/1284618.jpg';
	import img_crewmate_2 from '../assets/img/misc/1284635.jpg';
	import img_crewmate_3 from '../assets/img/misc/1284623.jpg';
	import img_crewmate_4 from '../assets/img/misc/1284638.jpg';
	import img_crewmate_5 from '../assets/img/misc/1284615.jpg';
	import img_child from '../assets/img/misc/edward-cisneros-r_Tnjj6TB30-unsplash.jpg';
	import Marquee from '../lib/marquee/Marquee.svelte';
	import { TitleOfPage } from '@sxxov/sv/misc';
</script>

<TitleOfPage title="Home — Cloething" />
<div class="home">
	<div class="spring">
		<div class="banner">
			<hr />
			<p>Spring Collection</p>
			<hr />
		</div>
		<div class="cover">
			<img
				src={img_spring_1}
				alt="Cover"
			/>
			<div class="heading">
				<h1>S<i>p</i>ring<br />Co<i>ll</i>ec<i>t</i>ion</h1>
			</div>
		</div>
		<div class="other">
			<img
				src={img_spring_2}
				alt="Other"
			/>
			<img
				src={img_spring_3}
				alt="Other"
			/>
			<img
				src={img_spring_4}
				alt="Other"
			/>
		</div>
		<div class="marquee">
			<Marquee gap={0}>
				<p class="text">SPRING&nbsp;&nbsp;&nbsp;✧&nbsp;&nbsp;&nbsp;</p>
			</Marquee>
		</div>
		<div class="summary">
			<p>
				Introducing Evolution, the Spring/Summer 2020 runway collection.
				Captured in a series of images by Inez and Vinoodh, the cast
				includes Kendall, Bella and Gigi Hadid and He Cong. The campaign
				shines a spotlight on a new Burberry attitude, where classic
				meets the eccentric – a very British contrast. Unconventional
				poses and animal-inspired shapes and silhouettes created by the
				cast reinforce both Thomas Burberry’s and Riccardo Tisci’s
				recognition of the power and symbolism of animals.
			</p>
		</div>
		<div class="cta">
			<div class="content">
				<a href="/search/?tag=spring-2023">
					<Button
						{...ButtonVariants.Primary}
						width="max-content"
						colourBackground="----colour-accent-primary"
						colourBackgroundHover="----colour-background-secondary"
						colourText="----colour-background-primary"
						colourTextHover="----colour-accent-primary"
						padding={35}
						roundness={35}
						><Svg svg={ic_waving_hand} />&nbsp;
						<b>EXPLORE SPRING</b>
					</Button></a
				>
			</div>
		</div>
	</div>

	<div class="marquee">
		<Marquee gap={0}>
			<p class="text">SUMMER?&nbsp;&nbsp;&nbsp;✧&nbsp;&nbsp;&nbsp;</p>
		</Marquee>
	</div>

	<div class="banner">
		<hr />
		<p>Crewmate Series</p>
		<hr />
	</div>

	<div class="crewmate">
		<div class="cover">
			<img
				src={img_crewmate_1}
				alt="Cover"
			/>
			<div class="heading">
				<h1>Cre<i>w</i>ma<i>t</i>e<br />Ser<i>i</i>es</h1>
			</div>
		</div>
		<div class="marquee">
			<Marquee gap={0}>
				<p class="text">
					CREWMATE&nbsp;&nbsp;&nbsp;✧&nbsp;&nbsp;&nbsp;
				</p>
			</Marquee>
		</div>
		<div class="other">
			<img
				src={img_crewmate_2}
				alt="Other"
			/>
			<div class="summary">
				<p>
					Riccardo Tisci’s third runway collection for the house – a
					celebration of new house codes and a juxtaposition of
					heritage and modernity.
					<br /><br />
					For the Cloething woman, sleek tailoring is transformed with
					cinched-waist blazers, structured box-pleat skirt suits and double-pleat
					trousers, whilst hems are embellished with fringing and draped
					chains. Hand-painted collages of animals play out across billowing
					silks – refined and elegant. Contrasting corset detailing, logo-embroidered
					tulle and step-through skirts have a sportswear influence. Evening
					wear, in a muted Cloething palette of beige and black, is a marriage
					of simplicity and elegance – embellished with crystal mesh and
					hand-tiered ostrich feathers.
				</p>
			</div>
			<img
				src={img_crewmate_3}
				alt="Other"
			/>
			<img
				src={img_crewmate_4}
				alt="Other"
			/>
			<img
				src={img_crewmate_5}
				alt="Other"
			/>
		</div>
		<div class="cta">
			<div class="content">
				<a href="/search/?tag=/crewmate-2023">
					<Button
						{...ButtonVariants.Primary}
						width="max-content"
						colourBackground="----colour-accent-primary"
						colourBackgroundHover="----colour-background-secondary"
						colourText="----colour-background-primary"
						colourTextHover="----colour-accent-primary"
						padding={35}
						roundness={35}
						><Svg svg={ic_waving_hand} />&nbsp;
						<b>EXPLORE CREWMATE</b>
					</Button></a
				>
			</div>
		</div>
	</div>

	<div class="marquee">
		<Marquee gap={0}>
			<p class="text">MATE?&nbsp;&nbsp;&nbsp;✧&nbsp;&nbsp;&nbsp;</p>
		</Marquee>
	</div>

	<div class="banner">
		<hr />
		<p>Full Catalogue</p>
		<hr />
	</div>

	<div class="rest">
		<div class="background">
			<div class="content">
				<h1>
					<a href="/search">
						<i>E</i>very<i>thi</i>ng
						<i>El</i>se</a
					>
				</h1>

				<p>Our full catalogue, spick & span.</p>
			</div>
		</div>

		<div class="cta">
			<div class="content">
				<a href="/search">
					<Button
						{...ButtonVariants.Primary}
						padding={35}
						roundness={35}
						><Svg svg={ic_waving_hand} />&nbsp;
						<b>EXPLORE FULL CATALOGUE</b>
					</Button></a
				>
			</div>
		</div>
	</div>

	<div class="marquee">
		<Marquee gap={0}>
			<p class="text">MORE&nbsp;&nbsp;&nbsp;✧&nbsp;&nbsp;&nbsp;</p>
		</Marquee>
	</div>

	<div class="banner">
		<hr />
		<p>Education</p>
		<hr />
	</div>

	<div class="education">
		<div class="content">
			<div class="heading"><h1>Cloething Education</h1></div>
			<div class="cta">
				<a href="/education">
					<Button
						{...ButtonVariants.Primary}
						width="100%"
						padding={35}
						roundness={35}
						><svelte:fragment slot="left"
							><Svg svg={ic_cruelty_free} /></svelte:fragment
						>Partake<svelte:fragment slot="right"
							><Svg svg={ic_arrow_outward} /></svelte:fragment
						>
					</Button></a
				>
			</div>
			<p>
				Join the movement towards a more sustainable future with
				Cloething Education, a hub for learning & opportunities through
				fashion. We believe in the power of knowledge & action, and
				we're here to make a difference. With the hub, you can donate
				clothes while learning about the detrimental impact of fast
				fashion on our planet and society. Together, we can create a
				more conscious and compassionate world.
			</p>
		</div>
		<div class="cover">
			<img
				src={img_child}
				alt="Children smiling at the camera"
			/>
			<div class="foreground" />
		</div>
	</div>
	<div class="marquee">
		<Marquee gap={0}>
			<p class="text">IT ENDED?&nbsp;&nbsp;&nbsp;✧&nbsp;&nbsp;&nbsp;</p>
		</Marquee>
	</div>
</div>

<style lang="postcss">
	.marquee {
		background: var(----colour-background-primary);
	}

	.banner {
		position: sticky;
		top: 84px;
		left: 0;
		z-index: 1;
		height: 56px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 14px;
		padding: 14px;
		box-sizing: border-box;
		/* background: var(----colour-background-primary); */
		background: linear-gradient(
			180deg,
			var(----colour-background-primary) 0%,
			rgba(0, 0, 0, 0) 100%
		);
		backdrop-filter: blur(20px);
		border-bottom: 1px solid var(----colour-background-secondary);
		box-shadow: var(----shadow-md), var(----shadow-inner-sm);

		& p {
			text-transform: uppercase;
			margin: 0;
			padding: 0.6em 0;
			font-weight: 900;
			flex-shrink: 0;
			color: var(----colour-accent-primary);
		}
	}

	.spring {
		& > .cover {
			position: relative;
			width: 100%;
			height: calc(100vh - 84px);
			height: calc(100svh - 84px);
			overflow: hidden;
			overflow: clip;

			/* position: sticky;
			top: 84px;
			z-index: -1; */

			& > img {
				width: 100%;
				height: 100%;
				object-fit: cover;
				object-position: top;

				filter: saturate(0);
			}

			& > .heading {
				position: absolute;
				width: 100%;
				height: 100%;
				top: 0;
				left: 0;
				display: flex;
				align-items: center;
				justify-content: center;

				& > h1 {
					text-align: center;
					font-size: max(16vw, 96px);
					font-weight: 300;
					line-height: 0.6;
					color: var(----colour-text-primary);
					text-shadow: 0 25px 16px var(----colour-text-primary),
						0 39px 140px var(----colour-background-primary),
						0 71px 30px var(----colour-text-primary);
				}
			}
		}

		& > .other {
			box-sizing: border-box;

			display: flex;
			flex-wrap: wrap;

			border-top: 1px solid var(----colour-background-secondary);
			box-shadow: var(----shadow-md), var(----shadow-inner-sm);

			& > * {
				width: calc(100% / 2);
				min-width: 400px;
				flex-grow: 1;
				/* width: 100%; */
				height: 75vh;
				object-fit: cover;
			}
		}

		& > .summary {
			padding: 112px var(----padding);
			box-sizing: border-box;
			width: 100%;
			background: var(----colour-background-primary);
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			& > p {
				max-width: 1200px;
				font-weight: 300;
				line-height: 1.6;
				color: var(----colour-text-primary);
				margin: 0;
				columns: 400px;
				gap: 6em;
			}
		}

		& > .cta {
			/* position: absolute;
				width: 100%;
				height: 66%; */
			position: sticky;
			bottom: 0;
			left: 0;
			padding: 28px 0;
			display: flex;
			align-items: center;
			justify-content: center;

			& > .content {
				backdrop-filter: blur(56px);
				border-radius: 56px;
			}
		}
	}

	.crewmate {
		& > .cover {
			position: relative;
			width: 100%;
			height: calc(100vh - 84px);
			height: calc(100svh - 84px);
			overflow: hidden;
			overflow: clip;

			/* position: sticky;
			top: 84px;
			z-index: -1; */

			& > img {
				width: 100%;
				height: 100%;
				object-fit: cover;
				object-position: top;

				filter: saturate(0);
			}

			& > .heading {
				position: absolute;
				width: 100%;
				height: 100%;
				top: 0;
				left: 0;
				display: flex;
				align-items: center;
				justify-content: center;
				/* padding: 56px; */

				& > h1 {
					text-align: center;
					font-size: max(10vw, 72px);
					font-weight: 300;
					line-height: 0.6;
					/* margin-top: 0; */
					color: var(----colour-background-primary);
					text-shadow: 0 10px 16px var(----colour-background-primary),
						0 39px 40px var(----colour-background-primary),
						0 71px 46px var(----colour-text-primary);
				}
			}
		}

		& > .other {
			box-sizing: border-box;

			display: flex;
			flex-wrap: wrap;

			& > * {
				width: calc(100% / 3);
				min-width: 400px;
				flex-grow: 1;
				/* width: 100%; */
				max-height: 75vh;
				object-fit: cover;
			}

			& > .summary {
				padding: 56px;
				box-sizing: border-box;
				margin: 0 auto;
				max-width: 1200px;
				max-height: none;
				/* width: 100%; */
				/* text-align: center; */

				background: var(----colour-background-primary);

				& > p {
					/* font-size: 1.6rem; */
					font-weight: 300;
					line-height: 1.6;
					color: var(----colour-text-primary);
					margin: 0;
					columns: 400px;
					gap: 6em;
				}
			}
		}

		& > .cta {
			position: sticky;
			bottom: 0;
			left: 0;
			padding: 28px 0;
			display: flex;
			align-items: center;
			justify-content: center;

			& > .content {
				backdrop-filter: blur(56px);
				border-radius: 56px;
			}
		}
	}

	.rest {
		position: relative;
		/* position: sticky;
		top: 84px; */
		/* height: calc(100vh - 84px);
		height: calc(100svh - 84px); */

		& > .background {
			width: 100%;
			/* height: 100%; */
			height: calc(100vh - 84px);
			height: calc(100svh - 84px);

			display: flex;
			align-items: center;
			justify-content: center;

			background: var(----colour-background-primary);

			& > .content {
				width: 100%;
				border-top: 1px solid var(----colour-background-secondary);
				border-bottom: 1px solid var(----colour-background-secondary);
				background: var(----colour-background-primary);
				box-shadow: var(----shadow-inner-sm);
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;

				& > h1 {
					font-size: max(16vw, 96px);
					font-weight: 300;
					line-height: 0.6;
					color: var(----colour-text-primary);
					text-align: center;

					text-decoration-line: underline;
					text-decoration-thickness: 0.01em;
					text-underline-offset: 0.1em;
					text-decoration-color: var(----colour-accent-secondary);

					& > a {
						text-decoration: none;
					}
				}

				& > p {
					text-align: center;
					/* color: var(----colour-accent-secondary); */
				}

				/* & > .cta {
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					padding: 28px 0;
					display: flex;
					align-items: center;
					justify-content: center;

					& > .content {
						backdrop-filter: blur(56px);
						border-radius: 56px;
					}
				} */
			}
		}

		& > .cta {
			position: sticky;
			bottom: 0;
			left: 0;
			padding: 28px 0;
			display: flex;
			align-items: center;
			justify-content: center;

			& > .content {
				backdrop-filter: blur(56px);
				border-radius: 56px;
			}
		}
	}

	.education {
		/* position: sticky;
		top: 84px; */
		/* display: grid;
		grid-auto-flow: dense;
		grid-template-columns: repeat(auto-fit, minmax(336px, auto)); */
		display: flex;
		flex-wrap: wrap;
		gap: 28px;

		min-height: calc(100vh - 84px);

		background: var(----colour-background-primary);
		border-top: 1px solid var(----colour-background-secondary);
		box-shadow: var(----shadow-inner-sm), var(----shadow-sm);

		& > .cover {
			position: relative;
			flex-grow: 1;
			width: 336px;

			& > img {
				width: 100%;
				height: 100%;
				object-fit: cover;
				object-position: top;
			}

			& > .foreground {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background: linear-gradient(
					-90deg,
					var(----colour-background-transparent) 50%,
					var(----colour-background-primary) 100%
				);
			}
		}

		& > .content {
			flex-grow: 1;
			width: min-content;
			max-width: 392px;
			padding: 28px;
			padding-top: 0;
			box-sizing: border-box;

			& > .heading {
				& > h1 {
					margin-bottom: 0;
				}
			}

			& > p {
				margin-top: 0;
			}

			& > .cta {
				padding: 56px 0;
				box-sizing: border-box;
				max-width: 100%;
			}
		}
	}
</style>
