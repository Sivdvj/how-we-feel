<script>
	import Icon from "../lib/Icons.svelte";
	import ThreeParticles from "../lib/ThreeParticles.svelte";
	export let goto;
	let message = "";
</script>

<div class="relative h-full w-full overflow-hidden p-4">
	<div class="pointer-events-none absolute inset-0 z-0 opacity-60 blur-md">
		<ThreeParticles colorParticles={localStorage.getItem("Color")} />
	</div>
	<div class="relative z-10 flex w-full flex-row items-center justify-between text-white">
		<button class="cursor-pointer" on:click={() => goto("screen4")}>
			<Icon icon="material-symbols-light:close-rounded" showCircle={false} />
		</button>
		<div class="flex flex-row">
			<Icon icon="material-symbols-light:ink-pen-rounded" showCircle={false} height={10} />
			<div style="color:{localStorage.getItem('Color')}">
				<Icon icon="material-symbols-light:pentagon-rounded" showCircle={false} height={10} />
			</div>
		</div>
	</div>
	<div class="relative z-10 flex h-full flex-col justify-center">
		<div class="text-center font-serif font-bold text-white">
			<p>Describe what might be causing you to feel</p>
			<p style="color: {localStorage.getItem('Color')}" class="text-xl font-extrabold">{localStorage.getItem("Emotion")}</p>
			<br /><input type="text" placeholder="describe" bind:value={message} class="text-center font-light outline-none placeholder:italic" />
		</div>
	</div>
	<div class="fixed bottom-4 left-0 z-10 flex w-full flex-row items-start justify-between text-white md:absolute">
		<div class="flex flex-row">
			<Icon icon="material-symbols-light:mic" fill="#242424" size={20} width={8} height={8} />
			<Icon icon="weui:camera-outlined" fill="#242424" size={20} width={8} height={8} />
			<Icon icon="octicon:sparkle-24" fill="#242424" size={20} width={8} height={8} />
		</div>
		<button
			class="cursor-pointer text-black"
			on:click={() => {
				localStorage.setItem("Feeling", message);
				goto("screen6");
			}}
		>
			<Icon icon="material-symbols-light:arrow-forward-rounded" fill="#ffffff" size={20} />
		</button>
	</div>
</div>
